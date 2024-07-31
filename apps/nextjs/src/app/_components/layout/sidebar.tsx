"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn, History, ListTodo, Receipt } from "@acme/ui";
import { Label } from "@acme/ui/label";

const sidebarItems = [
  {
    icon: <ListTodo className="h-6 w-6" />,
    label: "Reminders",
    path: "/reminders",
  },
  {
    icon: <History className="h-6 w-6" />,
    label: "Daily Routines",
    path: "/daily-routines",
  },
  {
    icon: <Receipt className="h-6 w-6" />,
    label: "Expenses",
    path: "/expenses",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };
  const isPathActive = (path: string) => pathname === path;

  return (
    <aside className="bg-primary-background flex h-screen w-64 flex-col gap-3 p-4 text-primary-foreground">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          isActive={isPathActive(item.path)}
          navigate={() => navigate(item.path)}
        />
      ))}
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  navigate: () => void;
}

function SidebarItem({ icon, label, isActive, navigate }: SidebarItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-full p-4 hover:cursor-pointer hover:bg-primary-foreground hover:text-primary",
        isActive && "bg-primary-foreground text-primary",
      )}
      onClick={navigate}
    >
      {icon}
      <Label className="hover:cursor-pointer">{label}</Label>
    </div>
  );
}
