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

      <section className="py-8">
        <div className="container mx-auto">
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
      <section className="py-8 bg-gradient-to-br">
        <div className="container mx-auto px-4 border border-gray-400 rounded-2xl p-4 md:p-8 max-w-6xl">
          <div className="mx-auto">
            {/* Original Image Section */}
            <div className="text-center mb-8">
              <h3 className="text-sm font-medium tracking-wider mb-4">
                ORIGINAL
              </h3>
              <div className="flex justify-center">
                <div className="relative w-full md:w-1/2 aspect-[1080/650] rounded-lg overflow-hidden border-2 border-gray-400">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-8.jpg"
                  alt="Watercolor Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-9.jpg"
                  alt="Ghibli Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-10.jpg"
                  alt="3D Clay Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
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
              <h3 className="text-sm font-medium tracking-wider mb-6 uppercase">
                Style Generation Prompts
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

      {/* Style Showcase Section */}
      <section className="py-8 bg-gradient-to-br">
        <div className="container mx-auto px-4 border border-gray-400 rounded-2xl p-4 md:p-8 max-w-6xl">
          <div className="mx-auto">
            {/* Original Image Section */}
            <div className="text-center mb-8">
              <h3 className="text-sm font-medium tracking-wider mb-4">
                ORIGINAL
              </h3>
              <div className="flex justify-center">
                <div className="relative w-full md:w-1/2 aspect-[1080/650] rounded-lg overflow-hidden border-2 border-gray-400">
                  <Image
                    src="/images/flux-kontext-image-12.jpg"
                    alt="Original Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-13.jpg"
                  alt="Watercolor Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-14.jpg"
                  alt="Ghibli Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-15.jpg"
                  alt="3D Clay Style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[1080/650] rounded-lg overflow-hidden border border-gray-400">
                <Image
                  src="/images/flux-kontext-image-16.jpg"
                  alt="Pixel Art Style"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Prompts Section */}
            <div className="text-center">
              <h3 className="text-sm font-medium tracking-wider mb-6 uppercase">
                Scene Generation Prompts
              </h3>
              <div className="flex flex-col gap-4 text-left">
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    1. Morning Scene
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Keeping the original picture style, an alley in Jiangnan in
                    the early morning has just been washed away by rain. A paper
                    kite is wrapped around an electric pole, a bamboo basket is
                    hung under the eaves, and the teahouse at the end of the
                    alley has just opened its doors, with warm lights spilling
                    out from inside.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    2. Character Addition
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Keeping the original style of the picture, a woman in a dark
                    green cheongsam walks into a rainy alley with an umbrella
                    and a faintly thoughtful expression on her face. She walks
                    through the gray bricks and tiled roofs, the raindrops
                    gently patting her umbrella, and the lanterns on the
                    roadside gently swaying in the wind.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    3. Close-up Shot
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Keeping the original picture style, the camera closes in on
                    a corner of the roof where there is a small bird, giving a
                    close-up shot of the bird.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-semibold text-sm mb-2">
                    4. Shop Detail
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Keeping with the original picture style, she passes a
                    tailor's store with unfinished fabrics hanging in the
                    window. A cat snoozes on the pediment next to the door,
                    while inside the store, an old man stitches intently, each
                    stitch meticulous.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto">
            {/* Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BeforeAfterComparison
                beforeImage="/images/flux-kontext-image-17.jpg"
                afterImage="/images/flux-kontext-image-18.jpg"
                aspectRatio="aspect-square"
                showPrompt={false}
                textAlign="text-left"
                gridCols="grid-cols-2"
                prompt="Keep the facial features and expression unchanged. The person is not looking at the camera, a full profile shot."
              />
              <BeforeAfterComparison
                beforeImage="/images/flux-kontext-image-19.jpg"
                afterImage="/images/flux-kontext-image-20.jpg"
                aspectRatio="aspect-square"
                showPrompt={false}
                textAlign="text-left"
                gridCols="grid-cols-2"
                prompt="Change the girl's expression to a smile and then stand in front of the supermarket shelves."
              />
              <BeforeAfterComparison
                beforeImage="/images/flux-kontext-image-21.jpg"
                afterImage="/images/flux-kontext-image-22.jpg"
                aspectRatio="aspect-square"
                showPrompt={false}
                textAlign="text-left"
                gridCols="grid-cols-2"
                prompt="Preserve facial structure.The character is playing the guitar, her gaze is lowered towards the guitar, leaving the back of her head for the audience, and the camera zooms in."
              />
              <BeforeAfterComparison
                beforeImage="/images/flux-kontext-image-23.jpg"
                afterImage="/images/flux-kontext-image-24.jpg"
                aspectRatio="aspect-square"
                showPrompt={false}
                textAlign="text-left"
                gridCols="grid-cols-2"
                prompt="Maintain the setting of the main character Shiba Inu.The Shiba Inu is sitting in the car driving."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <div className="mx-auto mt-8 lg:mt-12">
            <BeforeAfterComparison
              beforeImage="/images/flux-kontext-image-25.jpg"
              afterImage="/images/flux-kontext-image-26.jpg"
              aspectRatio="aspect-[4/3]"
              textAlign="text-left"
              prompt={`Replace "fief" with "Irene." Keep the same font style.`}
              className="mb-8"
            />

            <BeforeAfterComparison
              beforeImage="/images/flux-kontext-image-27.jpg"
              afterImage="/images/flux-kontext-image-28.jpg"
              aspectRatio="aspect-square"
              objectFit="object-contain"
              textAlign="text-left"
              prompt={`Keep the font style unchanged, replace "Redefine Your Weekend" with "Procrastinate Professionally"; Replace "Break away from toxic work culture and embrace two days of conscious rest and recharge." with "Call it 'self-directed learning' while rewatching cat videos and Googling 'how can focus."`}
              className="mb-8"
            />
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
