import { EventList } from "@/components/events/event-list";
import { SearchBar } from "@/components/ui/search-bar";

import { getCategories, PER_PAGE } from "@/lib/api";
import { getEvents } from "@/lib/api";
import { Suspense } from "react";

type HomeProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search ?? "";
  const category = params.category ?? "";

  const [{ events, totalPages, totalItems }, categories] = await Promise.all([
    getEvents(page, PER_PAGE, search, category),
    getCategories(),
  ]);

  return (
    <main className="flex flex-1 flex-col font-sans w-full max-w-7xl mx-auto items-center py-6 p-4 sm:items-start gap-4 ">
      <h1 className="text-3xl">My cool page</h1>
      <h2 className="text-brand-navy bo text-lg">Events near you</h2>

      <SearchBar categories={categories} />
      <EventList
        events={events}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
      />
    </main>
  );
}
