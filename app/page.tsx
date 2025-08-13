"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "@/components/LoginModal";
import PurchaseCreditsModal from "@/components/PurchaseCreditsModal";
import ImageGenerator from "@/components/ImageGenerator";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
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
            <BeforeAfterComparison
              beforeImage="/images/flux-kontext-image-1.jpg"
              afterImage="/images/flux-kontext-image-2.jpg"
              prompt="Character remain unchanged, the cars in the background remain unchanged, change the car's color to red."
              className="mb-8"
            />

            <BeforeAfterComparison
              beforeImage="/images/flux-kontext-image-3.jpg"
              afterImage="/images/flux-kontext-image-4.jpg"
              prompt="Maintain all other characters and scenes unchanged, remove the man in the center, and replace him with a bonsai"
              className="mb-8"
            />

            <BeforeAfterComparison
              beforeImage="/images/flux-kontext-image-5.jpg"
              afterImage="/images/flux-kontext-image-6.jpg"
              prompt="Remove all passerby from the background, change the background to a volcanic crater"
            />
          </div>
        </div>
      </section>

      {/* Style Showcase Section */}
      <section className="py-16 bg-gradient-to-br">
        <div className="container mx-auto px-4 border border-gray-400 rounded-3xl p-8 lg:p-12 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            {/* Original Image Section */}
            <div className="text-center mb-8">
              <h3 className="text-white text-sm font-medium tracking-wider mb-4 opacity-70">
                ORIGINAL
              </h3>
              <div className="flex justify-center">
                <div className="relative w-[calc(50%-0.5rem)] max-w-md h-64 rounded-lg overflow-hidden border-2 border-gray-400">
                  <Image
                    src="/images/flux-kontext-image-7.jpg"
                    alt="Original Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Style Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-8.jpg"
                  alt="Watercolor Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-9.jpg"
                  alt="Ghibli Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-10.jpg"
                  alt="3D Clay Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-11.jpg"
                  alt="Pixel Art Style"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Prompts Section */}
            <div className="text-center">
              <h3 className="text-white text-sm font-medium tracking-wider mb-6 opacity-70">
                PROMPTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    1. Watercolor
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Transform the style into a watercolor style, cute, keeping
                    the characters and background unchanged.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    2. Ghibli
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Change the style to Japanese Ghibli style, keeping the
                    characters and environment unchanged.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    3. 3D Clay
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Change the style to cartoon 3D clay texture style, keeping
                    the characters and environment unchanged.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    4. Pixel Art
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Convert the style to a 16-bit mosaic pixel style, keeping
                    the main character and background unchanged.
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
