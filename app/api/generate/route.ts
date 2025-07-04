import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const API_URL = "https://api.tu-zi.com/v1/images/generations";
const API_TOKEN = process.env.FLUX_KONTENT_API_KEY;

export async function POST(req: NextRequest) {
  if (!API_TOKEN) {
    return NextResponse.json(
      {
        error:
          "API token not configured. Please set FLUX_KONTENT_API_KEY in your .env.local file.",
      },
      { status: 500 }
    );
  }

  const prisma = new PrismaClient();

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Check user credits
    const userCredit = await prisma.userCredit.findUnique({
      where: { userId: session.user.id },
    });

    if (!userCredit || userCredit.credits <= 0) {
      return NextResponse.json(
        {
          error:
            "Insufficient credits. Please purchase more credits to continue.",
        },
        { status: 402 }
      );
    }

    const { prompt, aspectRatio } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiRequestBody: {
      model: string;
      prompt: string;
      aspect_ratio?: string;
    } = {
      model: "flux-kontext-pro",
      prompt: prompt,
      // aspect_ratio: aspectRatio,
      // Add other optional parameters from your python script if needed
      // output_format: "png",
      // safety_tolerance: 2,
      // prompt_upsampling: false,
    };

    if (aspectRatio) {
      apiRequestBody.aspect_ratio = aspectRatio;
    }

    console.log("apiRequestBody", JSON.stringify(apiRequestBody));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorJson.error.message || `API Error: ${response.status}` },
          { status: response.status }
        );
      } catch (e) {
        return NextResponse.json(
          { error: `API Error: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }
    }

    const result = await response.json();

    // Assuming the response contains the image URL in a structure like { data: [{ url: '...' }] }
    // You might need to adjust this based on the actual API response.
    const imageUrl = result.data?.[0]?.url;

    if (!imageUrl) {
      console.error("Could not find image URL in API response:", result);
      return NextResponse.json(
        { error: "Failed to generate image, no URL in response." },
        { status: 500 }
      );
    }

    // Deduct 1 credit from user after successful generation
    await prisma.userCredit.update({
      where: { userId: session.user.id },
      data: { credits: { decrement: 1 } },
    });

    return NextResponse.json({ url: imageUrl });
  } catch (e) {
    const error = e as Error;
    console.error("Error in generate API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
