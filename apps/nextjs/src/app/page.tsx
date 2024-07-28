import { api, HydrateClient } from "~/trpc/server";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  void api.category.all.prefetch();
  void api.folder.all.prefetch();
  void api.reminder.all.prefetch();

  return <HydrateClient>Content</HydrateClient>;
}
