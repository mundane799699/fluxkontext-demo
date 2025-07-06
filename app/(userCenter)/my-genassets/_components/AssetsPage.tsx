import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { headers } from "next/headers";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import AssetCard from "./AssetCard";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

// 缓存用户资产查询，缓存5分钟
const getUserAssets = async (userId: string) => {
  return await prisma.assets.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

const AssetsPage = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const assets = await getUserAssets(session.user.id);
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
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
