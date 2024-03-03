import { usePathname, useSearchParams } from "next/navigation";

type TResult = {
  sort: string | null;
  order: string | null;
  createSortURL: (sort?: string, order?: string) => string;
};

export const useSortParams = (): TResult => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  const createSortURL = (newSort?: string, newOrder?: string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (newSort != null) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    if (newOrder != null) {
      params.set("order", newOrder);
    } else {
      params.delete("order");
    }

    return `${pathname}?${params.toString()}`;
  };

  return {
    sort,
    order,
    createSortURL,
  };
};
