import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const UserCenterLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="bg-gray-50 font-sans h-full">
      <div className="flex h-full">
        {/* 侧边栏 */}
        <Sidebar />

        {/* 主要内容区域 */}
        <div className="ml-64 flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default UserCenterLayout;
