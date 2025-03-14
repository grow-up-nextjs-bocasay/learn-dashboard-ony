"use client";

import { ChangeEventHandler, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> =
    useDebouncedCallback(async (event) => {
      const term = event.target.value;

      if (term) {
        params.set("query", term);
        params.set("page", "1");
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={handleSearch}
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
