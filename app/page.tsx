"use client";

import Image from "next/image";
import { useState, ChangeEvent, useRef } from "react";

const CloseIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L11 11M11 1L1 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12.5H12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3.5V9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 7.5L8 9.5L10 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [aiFeature, setAiFeature] = useState<string>("Photo to Anime");
  const [prompt, setPrompt] = useState<string>(
    "Transform this photograph into a high-quality anime or manga style illustration. Apply characteristic anime features such as stylized eyes, smooth skin rendering, vibrant colors, and clean line art while maintaining the recognizable features and overall composition of the original subject."
  );
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateImage = async () => {
    if (!uploadedFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setResultImage(null);
    setError(null);

    try {
      // Step 1: Upload image to get URL
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Failed to upload image.");
      }

      const { url: imageUrl } = await uploadResponse.json();

      // Step 2: Call generate API with the image URL in the prompt
      const fullPrompt = `${imageUrl} ${prompt}`;

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          aspectRatio: aspectRatio,
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(
          errorData.error ||
            "An unknown error occurred during image generation."
        );
      }

      const result = await generateResponse.json();

      if (result.url) {
        setResultImage(result.url);
      } else {
        throw new Error("Could not find an image URL in the response.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const AspectRatioButton = ({ value }: { value: string }) => (
    <button
      onClick={() => setAspectRatio(value)}
      className={`px-4 py-2 rounded-md text-sm transition-colors ${
        aspectRatio === value
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {value}
    </button>
  );

  const AiFeatureButton = ({ value }: { value: string }) => (
    <button
      onClick={() => setAiFeature(value)}
      className={`px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
        aiFeature === value
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {value}
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-4 sm:p-8 font-sans">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Panel */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Upload Photo</h2>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-60 flex items-center justify-center relative cursor-pointer hover:border-blue-500 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
            {uploadedImage ? (
              <>
                <Image
                  src={uploadedImage}
                  alt="Uploaded preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedImage(null);
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md text-gray-600 hover:text-black transition-colors"
                >
                  <CloseIcon />
                </button>
              </>
            ) : (
              <p className="text-gray-500">Click to upload an image</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Image Requirements</h3>
            <div className="flex gap-2">
              <AspectRatioButton value="16:9" />
              <AspectRatioButton value="4:3" />
              <AspectRatioButton value="1:1" />
              <AspectRatioButton value="9:16" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Choose AI Feature</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <AiFeatureButton value="Default" />
              <AiFeatureButton value="Photo to Anime" />
              <AiFeatureButton value="Watermark Removal" />
              <AiFeatureButton value="Crowd Removal" />
              <AiFeatureButton value="Photo Restoration" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Prompt (Click to edit)</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={handleCreateImage}
            disabled={isLoading || !uploadedImage}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Create Image"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col">
          <h2 className="text-xl font-semibold">FLUX KONTENT Result</h2>
          <div className="flex-grow flex flex-col items-center justify-center mt-4">
            <div className="w-full min-h-[24rem] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isLoading && (
                <div className="animate-pulse text-gray-500">
                  Generating, please wait...
                </div>
              )}
              {error && (
                <div className="text-red-500 p-4 text-center">{error}</div>
              )}
              {!isLoading && !error && resultImage && (
                <Image
                  src={resultImage}
                  alt="Generated result"
                  layout="fill"
                  objectFit="contain"
                />
              )}
              {!isLoading && !error && !resultImage && (
                <p className="text-sm text-orange-500 font-semibold px-4 text-center">
                  Image generation takes 1-3 min. Please don&apos;t close this
                  tab.
                </p>
              )}
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              <a
                href={resultImage || "#"}
                download="generated_image.png"
                className={`w-full bg-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 ${
                  !resultImage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={(e) => !resultImage && e.preventDefault()}
              >
                <DownloadIcon />
                download result
              </a>
              <button className="w-full bg-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors">
                My Assets
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
