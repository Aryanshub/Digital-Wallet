"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      onClick={() => router.push(href)}
      className={`
        group flex items-center gap-3 cursor-pointer 
        px-6 py-3 rounded-lg transition-all duration-300 
        ${selected ? "bg-violet-100 text-violet-700 font-semibold" : "hover:bg-gray-100 text-slate-600"}
      `}
    >
      <div
        className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
          selected ? "text-violet-700" : ""
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-sm transition-colors duration-200 ${
          selected ? "text-violet-700" : ""
        }`}
      >
        {title}
      </span>
    </div>
  );
};
