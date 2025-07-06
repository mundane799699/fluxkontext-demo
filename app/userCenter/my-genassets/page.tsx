import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { redirect } from "next/navigation";
import Image from "next/image";
import AssetsPage from "./_components/AssetsPage";

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

async function getUserAssets(userId: string) {
  return await prisma.assets.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

const MyGenassetsPage = async () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        My Generated Assets
      </h1>
      <p className="text-gray-600 mb-6">
        View and manage your generated assets.
      </p>

      <AssetsPage />
    </div>
  );
};

export default MyGenassetsPage;
