"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "My Genassets", href: "/my-genassets" },
  { name: "My Orders", href: "/my-orders" },
  { name: "My Credits", href: "/my-credits" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 border-b md:border-r bg-white p-4 md:p-6">
      {/* 桌面端垂直导航 */}
      <nav className="space-y-2 flex md:flex-col">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block px-4 py-2 text-sm font-medium rounded-md transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
