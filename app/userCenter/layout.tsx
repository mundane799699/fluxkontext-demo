import Sidebar from "@/components/Sidebar";

const UserCenterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 font-sans h-full">
      <div className="flex h-full">
        {/* 侧边栏 */}
        <Sidebar />

        {/* 主要内容区域 */}
        <div className="ml-64 flex-1 bg-white rounded-lg shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserCenterLayout;
