"use client";

import Image from "next/image";
import { useState, ChangeEvent, useRef } from "react";
import CloseIcon from "@/components/CloseIcon";
import DownloadIcon from "@/components/DownloadIcon";
import { createAuthClient } from "better-auth/client";

type Prompt = {
  title: string;
  prompt: string;
};

type AspectRatio = {
  title: string;
  aspectRatio: string;
};

const aspectRatios: AspectRatio[] = [
  {
    title: "Original",
    aspectRatio: "",
  },
  {
    title: "16:9",
    aspectRatio: "16:9",
  },
  {
    title: "4:3",
    aspectRatio: "4:3",
  },
  {
    title: "1:1",
    aspectRatio: "1:1",
  },
  {
    title: "9:16",
    aspectRatio: "9:16",
  },
];

const prompts: Prompt[] = [
  {
    title: "Default",
    prompt: "",
  },
  {
    title: "Photo to Anime",
    prompt:
      "Transform this photograph into a high-quality anime or manga style illustration. Apply characteristic anime features such as stylized eyes, smooth skin rendering, vibrant colors, and clean line art while maintaining the recognizable features and overall composition of the original subject.",
  },
  {
    title: "Watermark Removal",
    prompt:
      "Remove all watermarks, logos, signatures, and text overlays from this image while maintaining the original image quality. Use intelligent content-aware filling techniques to seamlessly reconstruct the areas where watermarks were located, ensuring natural texture and color consistency.",
  },
  {
    title: "Crowd Removal",
    prompt:
      "Remove unwanted crowds, tourists, or other people from this image to create clean, unobstructed views. Use advanced content-aware techniques to reconstruct backgrounds and maintain natural scenery flow while preserving the main subject.",
  },
  {
    title: "Photo Restoration",
    prompt:
      "Restore this photograph to modern high-quality standards: remove film grain, dust, and scratches, enhance facial details and expressions, improve lighting and contrast, upscale to high resolution, maintain natural skin tones and authentic colors, sharp focus throughout, professional photography quality, clean and crisp details, photorealistic result, 4K output",
  },
];

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>(
    aspectRatios[0].aspectRatio
  );
  const [selectedAspectRatioTitle, setSelectedAspectRatioTitle] =
    useState<string>(aspectRatios[0].title);
  const [prompt, setPrompt] = useState<string>(prompts[0].prompt);
  const [selectedPromptTitle, setSelectedPromptTitle] = useState<string>(
    prompts[0].title
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

  const AspectRatioButton = ({ title, aspectRatio }: AspectRatio) => (
    <button
      onClick={() => {
        setSelectedAspectRatioTitle(title);
        setAspectRatio(aspectRatio);
      }}
      className={`px-4 py-2 rounded-md text-sm transition-colors ${
        selectedAspectRatioTitle === title
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {title}
    </button>
  );

  const AiFeatureButton = ({ prompt, title }: Prompt) => (
    <button
      onClick={() => {
        setSelectedPromptTitle(title);
        setPrompt(prompt);
      }}
      className={`px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
        selectedPromptTitle === title
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {title}
    </button>
  );

  const handleGoogleSignIn = async () => {
    const authClient = createAuthClient();
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-4 sm:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex justify-end items-center">
        <button
          onClick={handleGoogleSignIn}
          className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Sign in with Google
        </button>
      </header>
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
            <h3 className="font-semibold mb-2">Set output aspect ratio</h3>
            <div className="flex gap-2">
              {aspectRatios.map((aspectRatio) => (
                <AspectRatioButton
                  key={aspectRatio.title}
                  title={aspectRatio.title}
                  aspectRatio={aspectRatio.aspectRatio}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Choose AI Feature</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {prompts.map((prompt) => (
                <AiFeatureButton
                  key={prompt.title}
                  prompt={prompt.prompt}
                  title={prompt.title}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Prompt (Click to edit)</h3>
            <textarea
              placeholder="Enter your prompt in English"
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
