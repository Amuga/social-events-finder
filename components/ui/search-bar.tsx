"use client";

import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchProps = {
  categories: string[];
};

export const SearchBar = ({ categories }: SearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const category = searchParams.get("category") ?? "";

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const searchParamsString = searchParams.toString();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParamsString);

      if (search.trim()) {
        params.set("search", search.trim());
        params.delete("page");
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, searchParamsString, pathname, router]);

  const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParamsString);
    const selectedCategory = event.target.value;

    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };
  return (
    <search className="w-full">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-4 rounded-lg border border-brand-border bg-white p-5 sm:flex-row sm:items-center"
      >
        <div className="w-full flex-1">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>

          <input
            id="event-search"
            type="search"
            placeholder="Search events..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border border-brand-border px-3 py-2 text-brand-dark outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
          />
        </div>

        <div>
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>

          <select
            id="category-filter"
            value={category}
            onChange={changeCategory}
            disabled={isPending}
            className="w-full rounded-md border border-brand-border p-2 text-brand-dark outline-none hover:bg-brand-light focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 sm:w-auto"
          >
            <option value="">All categories</option>

            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>
        {isPending && (
          <span className="text-sm text-brand-dark" aria-live="polite">
            Updating events...
          </span>
        )}
      </form>
    </search>
  );
};
