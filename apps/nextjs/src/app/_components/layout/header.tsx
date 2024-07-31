import { BellDot, Settings, User } from "@acme/ui";

export default function Header() {
  return (
    <header className="bg-primary-background flex h-12 items-center justify-end gap-4 px-5">
      <HeaderIcon icon={<User className="h-6 w-6" />} />
      <HeaderIcon icon={<BellDot className="h-6 w-6" />} />
      <HeaderIcon icon={<Settings className="h-6 w-6" />} />
    </header>
  );
}

interface HeaderIconProps {
  icon: React.ReactNode;
}

function HeaderIcon({ icon }: HeaderIconProps) {
  return (
    <div className="font-semibold text-primary-foreground hover:cursor-pointer hover:text-secondary-foreground">
      {icon}
    </div>
  );
}
