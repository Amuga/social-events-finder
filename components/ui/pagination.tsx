"use client";
// components/pagination.tsx
import { PER_PAGE } from "@/lib/api";
import Link from "next/link";
import { useTransition } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemName?: string;
};

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemName,
}: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <nav className="mt-4 flex flex-col items-center gap-2">
      <p className="text-xs text-brand-dark">
        {`${Math.min(currentPage * PER_PAGE, totalItems)} of ${totalItems} ${itemName ? itemName : "items"}`}
      </p>

      <div className="flex items-center justify-center gap-2">
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={isPending}
            className="rounded-lg btn btn-secondary px-4 py-2 text-sm font-semibold"
          >
            {isPending ? "Loading..." : "Next"}
          </button>
        )}

        <span className="text-sm text-brand-dark">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={isPending}
            className="rounded-lg btn btn-primary px-4 py-2 text-sm font-semibold"
          >
            {isPending ? "Loading..." : "Next"}
          </button>
        )}
      </div>
    </nav>
  );
};
