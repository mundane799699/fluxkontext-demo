"use client";

import { useState } from "react";
import AssetCard from "./AssetCard";
import { Assets } from "@/lib/generated/prisma";

const AssetsPage = ({ assets: initialAssets }: { assets: Assets[] }) => {
  const [assets, setAssets] = useState<Assets[]>(initialAssets);
  return (
    <div>
      {assets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No assets found. Start generating some images!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onDelete={() => {
                setAssets((prevAssets) =>
                  prevAssets.filter((a) => a.id !== asset.id)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
