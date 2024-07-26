import { Suspense } from "react";

import { api, HydrateClient } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import CategoryList from "./_components/categories";
import FolderList from "./_components/folders";
import { Loading } from "./_components/loading";
import { ReminderList } from "./_components/reminders";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  void api.category.all.prefetch();
  void api.folder.all.prefetch();
  void api.reminder.all.prefetch();

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-primary">T3</span> Turbo
          </h1>
          <AuthShowcase />

          <Suspense fallback={<Loading />}>
            <div className="w-full max-w-2xl overflow-y-scroll">
              <CategoryList />
              <FolderList />
              <ReminderList />
            </div>
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
