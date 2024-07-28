import { cn, History, ListTodo, Receipt } from "@acme/ui";
import { Label } from "@acme/ui/label";

export default function Sidebar() {
  return (
    <aside className="bg-primary-background flex h-screen w-64 flex-col gap-3 p-4 text-primary">
      <SidebarItem
        isActive
        icon={<ListTodo className="h-6 w-6" />}
        label="Reminders"
      />
      <SidebarItem
        icon={<History className="h-6 w-6" />}
        label="Daily Routines"
      />
      <SidebarItem icon={<Receipt className="h-6 w-6" />} label="Expenses" />
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-full p-4 hover:cursor-pointer hover:bg-secondary hover:text-primary",
        isActive && "bg-secondary text-primary",
      )}
    >
      {icon}
      <Label className="hover:cursor-pointer">{label}</Label>
    </div>
  );
}
