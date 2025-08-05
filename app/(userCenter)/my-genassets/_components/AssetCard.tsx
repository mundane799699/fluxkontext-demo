"use client";

import { Assets } from "@/lib/generated/prisma";
import Image from "next/image";
import { useState } from "react";
import { CopyIcon, DownloadIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssetCardProps {
  asset: Assets;
  onDelete: () => void;
}

const AssetCard = ({ asset, onDelete }: AssetCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(asset.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // todo 你可以根据需要调整文件名和扩展名
      link.download = `asset-${asset.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("download failed:", error);
    }
  };

  const handleCopyPrompt = async () => {
    if (asset.prompt) {
      try {
        await navigator.clipboard.writeText(asset.prompt);
        toast.success("Prompt copied to clipboard");
      } catch (error) {
        console.error("copy failed:", error);
        toast.error("Failed to copy prompt");
      }
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/assets/${asset.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete asset");
      }

      toast.success("Asset deleted successfully");
      setShowDeleteDialog(false);
      onDelete();
    } catch (error) {
      console.error("delete failed:", error);
      toast.error("Failed to delete asset");
    } finally {
      setIsDeleting(false);
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
            {new Date(asset.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center gap-2">
            {asset.prompt && (
              <button
                onClick={handleCopyPrompt}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                title="Copy Prompt"
              >
                <CopyIcon className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleDownload}
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full"
              title="Download Asset"
            >
              <DownloadIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
              title="Delete Asset"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Asset</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this asset? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetCard;
