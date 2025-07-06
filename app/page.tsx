"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import CloseIcon from "@/components/CloseIcon";
import DownloadIcon from "@/components/DownloadIcon";
import LoginModal from "@/components/LoginModal";
import { findClosestAspectRatio } from "@/lib/image-utils";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/use-auth";

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

const promptConfigs: Prompt[] = [
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
  const { user } = useAuthStore();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>(
    aspectRatios[0].aspectRatio
  );
  const [selectedAspectRatioTitle, setSelectedAspectRatioTitle] =
    useState<string>(aspectRatios[0].title);
  const [prompt, setPrompt] = useState<string>(promptConfigs[0].prompt);
  const [selectedPromptTitle, setSelectedPromptTitle] = useState<string>(
    promptConfigs[0].title
  );
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const restorePendingData = async () => {
      const pendingDataJSON = localStorage.getItem("pending-generation-data");
      if (pendingDataJSON) {
        localStorage.removeItem("pending-generation-data");
        try {
          const pendingData = JSON.parse(pendingDataJSON);
          if (pendingData.uploadedImage) {
            setUploadedImage(pendingData.uploadedImage);
            setAspectRatio(pendingData.aspectRatio);
            setSelectedAspectRatioTitle(pendingData.selectedAspectRatioTitle);
            setPrompt(pendingData.prompt);
            setSelectedPromptTitle(pendingData.selectedPromptTitle);

            if (pendingData.fileName && pendingData.fileType) {
              const response = await fetch(pendingData.uploadedImage);
              const blob = await response.blob();
              const file = new File([blob], pendingData.fileName, {
                type: pendingData.fileType,
              });
              setUploadedFile(file);
            }
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

  const handleDownload = async () => {
    if (!resultImage || isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated_image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      setError("Failed to download image.");
    } finally {
      setIsDownloading(false);
    }
  };

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
    if (isLoading) {
      return;
    }

    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    if (!uploadedFile) {
      setError("Please upload an image first.");
      return;
    }

    if (!user) {
      setShowLoginModal(true);
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
      let aspectRatioToUse = aspectRatio;
      if (!aspectRatioToUse && uploadedImage) {
        aspectRatioToUse = await findClosestAspectRatio(uploadedImage);
      } else if (!aspectRatioToUse) {
        // Fallback for when no image is uploaded and no ratio is selected
        aspectRatioToUse = "16:9";
      }

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          aspectRatio: aspectRatioToUse,
        }),
      });

      if (generateResponse.status === 401) {
        setShowLoginModal(true);
        setIsLoading(false);
        return;
      }

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

  const handleBeforeLogin = () => {
    if (uploadedFile && uploadedImage) {
      const stateToSave = {
        uploadedImage,
        fileName: uploadedFile.name,
        fileType: uploadedFile.type,
        aspectRatio,
        selectedAspectRatioTitle,
        prompt,
        selectedPromptTitle,
      };
      localStorage.setItem(
        "pending-generation-data",
        JSON.stringify(stateToSave)
      );
    }
  };

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
                <img
                  src={uploadedImage}
                  alt="Uploaded preview"
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-md"
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
            <div className="flex gap-2 overflow-x-auto pb-2">
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
              {promptConfigs.map((config) => (
                <AiFeatureButton
                  key={config.title}
                  prompt={config.prompt}
                  title={config.title}
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
          <h2 className="text-xl font-semibold">FLUX KONTEXT Result</h2>
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
                <img
                  src={resultImage}
                  alt="Generated result"
                  className="absolute top-0 left-0 w-full h-full object-contain"
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
              <button
                onClick={handleDownload}
                disabled={!resultImage || isDownloading}
                className={`w-full bg-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 ${
                  !resultImage || isDownloading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <DownloadIcon />
                {isDownloading ? "Downloading..." : "download result"}
              </button>
              <button className="w-full bg-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors">
                My Assets
              </button>
            </div>
          </div>
        </div>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onBeforeLogin={handleBeforeLogin}
      />
    </div>
  );
}
