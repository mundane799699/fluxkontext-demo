"use client";

import { Assets } from "@/lib/generated/prisma";
import Image from "next/image";
import { useState } from "react";
import DownloadIcon from "@/components/DownloadIcon";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

interface AssetCardProps {
  asset: Assets;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(asset.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `asset-${asset.id}.jpg`; // 你可以根据需要调整文件名和扩展名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("下载失败:", error);
    }
  };

  const handleCopyPrompt = async () => {
    if (asset.prompt) {
      try {
        await navigator.clipboard.writeText(asset.prompt);
        toast.success("Prompt copied to clipboard");
      } catch (error) {
        console.error("复制失败:", error);
        toast.error("Failed to copy prompt");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-gray-100 group">
        <Image
          src={asset.url}
          alt={asset.prompt || "Generated asset"}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-200"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <button
          onClick={handleDownload}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg cursor-pointer absolute bottom-2 right-2 bg-background/80 hover:bg-background p-2 rounded-full"
          title="Download Asset"
        >
          <DownloadIcon />
        </button>
      </div>
      <div className="p-3">
        {asset.prompt && (
          <p
            className="text-sm text-gray-600 mb-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={asset.prompt}
          >
            {asset.prompt}
          </p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">
            {new Date(asset.updatedAt).toLocaleDateString()}
          </p>
          {asset.prompt && (
            <button
              onClick={handleCopyPrompt}
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
              title="Copy Prompt"
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
