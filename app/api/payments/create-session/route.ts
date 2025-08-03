import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    // Get session from request
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { credits, price } = await req.json();

    if (!credits || !price) {
      return NextResponse.json(
        { error: "Credits and price are required" },
        { status: 400 }
      );
    }

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: price,
        currency: "usd",
        credits: credits,
        status: "pending",
      },
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} AI Image Generation Credits`,
              description: `Purchase ${credits} credits for AI image generation`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/my-credits?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?cancelled=true`,
      metadata: {
        paymentId: payment.id,
        userId: session.user.id,
        credits: credits.toString(),
      },
    });

    // Update payment record with Stripe session ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
