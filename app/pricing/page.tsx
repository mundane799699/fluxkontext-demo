"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";

const creditPackages = [
  {
    credits: 100,
    price: 9.99,
    popular: false,
    description: "Perfect for trying out our AI image generation",
    features: [
      "100 AI image generations",
      "HD quality output",
      "Basic support",
    ],
  },
  {
    credits: 300,
    price: 29.99,
    popular: true,
    description: "Best value for regular users",
    features: [
      "300 AI image generations",
      "HD quality output",
      "Priority support",
      "Advanced editing features",
    ],
  },
  {
    credits: 700,
    price: 69.99,
    popular: false,
    description: "Ideal for professionals and heavy users",
    features: [
      "700 AI image generations",
      "HD quality output",
      "Priority support",
      "Advanced editing features",
      "Batch processing",
    ],
  },
];

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (credits: number, price: number) => {
    setIsLoading(true);
    try {
      // Create payment session
      const response = await fetch("/api/payments/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credits, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe redirect error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Credit Package
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get credits to unlock the power of AI image generation. Each credit
            allows you to generate one high-quality image.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.credits}
              className={`relative bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl ${
                pkg.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.credits} Credits
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ${pkg.price}
                </div>
                <div className="text-sm text-gray-500">
                  ${(pkg.price / pkg.credits).toFixed(2)} per credit
                </div>
                <p className="text-gray-600 mt-4">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(pkg.credits, pkg.price)}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  pkg.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading
                  ? "Processing..."
                  : `Purchase ${pkg.credits} Credits`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
