import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-10 items-center gap-5 bg-primary px-5">
      <HeaderItem href="/">Home</HeaderItem>
      <HeaderItem href="/category">Category</HeaderItem>
      <HeaderItem href="/folder">Folder</HeaderItem>
    </header>
  );
}

interface HeaderItemProps {
  children: React.ReactNode;
  href: string;
}

function HeaderItem({ children, href }: HeaderItemProps) {
  return (
    <Link href={href} className="hover:text-background">
      {children}
    </Link>
  );
}
