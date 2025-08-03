import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handlePaymentSuccess(session);
        break;
      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        await handlePaymentExpired(expiredSession);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(session: Stripe.Checkout.Session) {
  try {
    const paymentId = session.metadata?.paymentId;
    const userId = session.metadata?.userId;
    const credits = parseInt(session.metadata?.credits || "0");

    if (!paymentId || !userId || !credits) {
      console.error("Missing metadata in session:", session.metadata);
      return;
    }

    // Update payment record
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "completed",
        stripePaymentId: session.payment_intent as string,
      },
    });

    // Add credits to user account
    const userCredit = await prisma.userCredit.findUnique({
      where: { userId: userId },
    });

    if (userCredit) {
      await prisma.userCredit.update({
        where: { userId: userId },
        data: {
          credits: userCredit.credits + credits,
        },
      });
    } else {
      await prisma.userCredit.create({
        data: {
          userId: userId,
          credits: credits,
        },
      });
    }

    console.log(
      `Payment successful: Added ${credits} credits to user ${userId}`
    );
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}

async function handlePaymentExpired(session: Stripe.Checkout.Session) {
  try {
    const paymentId = session.metadata?.paymentId;

    if (!paymentId) {
      console.error("Missing paymentId in expired session metadata");
      return;
    }

    // Update payment record
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "cancelled" },
    });

    console.log(`Payment expired for session: ${session.id}`);
  } catch (error) {
    console.error("Error handling payment expiration:", error);
  }
}
