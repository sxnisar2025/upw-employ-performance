"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { employee, logout } = useAuth();

  const isAdmin = employee?.role === "admin";

  const menus = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      adminOnly: false,
    },
    {
      title: "Employees",
      href: "/dashboard/employees",
      icon: Users,
      adminOnly: true,
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      icon: FolderKanban,
      adminOnly: true,
    },
    {
      title: "Performance",
      href: "/dashboard/performance",
      icon: BarChart3,
      adminOnly: false,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      adminOnly: false,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      adminOnly: true,
    },
  ];

  const visibleMenus = menus.filter((menu) => {
    if (menu.adminOnly && !isAdmin) {
      return false;
    }
    return true;
  });

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">

      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">
          Upwork Tracker
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          {isAdmin ? "Administrator" : "Employee"}
        </p>

        {employee && (
          <p className="text-xs text-slate-500 mt-2">
            {employee.name}
          </p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {visibleMenus.map((menu) => {
          const Icon = menu.icon;

          const active =
            menu.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>

        <div className="mt-5 text-center text-xs text-slate-500">
          Version 1.0
        </div>
      </div>

    </aside>
  );
}