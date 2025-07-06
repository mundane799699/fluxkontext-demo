import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { headers } from "next/headers";
import Image from "next/image";
import { unstable_cache } from "next/cache";

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
            <div
              key={asset.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={asset.url}
                  alt={asset.prompt || "Generated asset"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-3">
                {asset.prompt && (
                  <p
                    className="text-sm text-gray-600 mb-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {asset.prompt}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(asset.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
