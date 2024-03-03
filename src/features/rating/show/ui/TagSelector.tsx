"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type TProps = {
  tags: string[];
};

export const TagSelector = (props: TProps): JSX.Element => {
  const { tags } = props;

  const tagsWithAll = ["Все", ...tags];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? tagsWithAll[0];

  const createTagURL = (tag: string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (tag === "Все") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleSelect = (tag: string): void => {
    router.replace(createTagURL(tag));
  };

  return (
    <div>
      <Label htmlFor="tag">Тег</Label>
      <Select name="tag" value={currentTag} onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Тег" />
        </SelectTrigger>
        <SelectContent>
          {tagsWithAll.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
