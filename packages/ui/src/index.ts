import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export * from "lucide-react";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };
