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
    <div className="bg-gray-50 font-sans h-[calc(100vh-4rem)] flex-col md:flex-row">
      <div className="flex flex-col md:flex-row h-full">
        {/* 侧边栏 */}
        <Sidebar />

        {/* 主要内容区域 */}
        <div className="flex-1 bg-white overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default UserCenterLayout;
