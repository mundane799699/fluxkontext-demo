"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PurchaseCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseCreditsModal({
  isOpen,
  onClose,
}: PurchaseCreditsModalProps) {
  const router = useRouter();

  const handleViewPricing = () => {
    onClose();
    router.push("/pricing");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insufficient Credits</DialogTitle>
          <DialogDescription>
            You don't have enough credits to generate an image. Purchase more
            credits to continue using our AI image generation service.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <div className="text-center py-4">
            <div className="text-6xl mb-4">💳</div>
            <p className="text-gray-600">
              Each image generation costs 1 credit. Get more credits to keep
              creating amazing images!
            </p>
          </div>

          <button
            onClick={handleViewPricing}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Pricing & Purchase Credits
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
