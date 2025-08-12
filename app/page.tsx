"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "@/components/LoginModal";
import PurchaseCreditsModal from "@/components/PurchaseCreditsModal";
import ImageGenerator from "@/components/ImageGenerator";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/use-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showPurchaseCreditsModal, setShowPurchaseCreditsModal] =
    useState<boolean>(false);
  const [pendingData, setPendingData] = useState<any>(null);

  useEffect(() => {
    const restorePendingData = async () => {
      const pendingDataJSON = localStorage.getItem("pending-generation-data");
      if (pendingDataJSON) {
        localStorage.removeItem("pending-generation-data");
        try {
          const data = JSON.parse(pendingDataJSON);
          if (data.uploadedImage) {
            setPendingData(data);
          }
        } catch (error) {
          console.error(
            "Failed to restore pending data from localStorage",
            error
          );
        }
      }
    };

    restorePendingData();
  }, []);

  const handleBeforeLogin = () => {
    // This function will be called by ImageGenerator component
    // The component will handle saving its own state
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 px-4 sm:px-8 font-sans">
      <section className="py-4 lg:py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-7xl font-bold text-balance my-2 lg:my-4">
            Professional Online Image Enhance with{" "}
            <span className="text-blue-500">FLUX KONTEXT AI</span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
            FREE credits for new users! Experience the power of Flux Context for
            online image enhance with our advanced FLUX KONTEXT AI technology.
          </p>
        </div>
      </section>
      <ImageGenerator
        onShowLoginModal={() => setShowLoginModal(true)}
        onShowPurchaseCreditsModal={() => setShowPurchaseCreditsModal(true)}
        onBeforeLogin={handleBeforeLogin}
        pendingData={pendingData}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="inline-block text-3xl font-bold">
              See What Flux Context Online Image Enhance Can Create
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore stunning transformations made instantly with our online
              image enhance technology.
            </p>
          </div>
          <div className="mx-auto mt-8 lg:mt-12">
            {/* Before/After Image Comparison */}
            <div className="relative bg-gradient-to-br border border-gray-400 rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Before Image */}
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="inline-block  text-sm font-medium px-4 py-2 rounded-full">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative">
                    <Image
                      src="/images/flux-kontext-image-1.jpg"
                      alt="Before image enhancement"
                      className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>

                {/* After Image */}
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="inline-block text-sm font-medium px-4 py-2 rounded-full">
                      AFTER
                    </span>
                  </div>
                  <div className="relative">
                    <Image
                      src="/images/flux-kontext-image-2.jpg"
                      alt="After image enhancement"
                      className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              </div>

              {/* Prompt Section */}
              <div className="mt-8 lg:mt-12 text-center">
                <h3 className="text-sm font-semibold mb-3 tracking-wider">
                  PROMPT
                </h3>
                <div className="backdrop-blur-sm rounded-2xl p-6 lg:p-8">
                  <p className="lg:text-lg leading-relaxed text-muted-foreground text-sm">
                    Character remain unchanged, the cars in the background
                    remain unchanged, change the car's color to red.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onBeforeLogin={handleBeforeLogin}
      />

      <PurchaseCreditsModal
        isOpen={showPurchaseCreditsModal}
        onClose={() => setShowPurchaseCreditsModal(false)}
      />
    </div>
  );
}
