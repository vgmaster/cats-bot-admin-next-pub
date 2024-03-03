"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";

type TProps = {
  types: string[];
};

export const TypeSelector = (props: TProps): JSX.Element => {
  const { types } = props;

  const typesWithAll = ["Все", ...types];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? typesWithAll[0];

  const createTypeURL = (type: string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (type === "Все") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleSelect = (type: string): void => {
    router.replace(createTypeURL(type));
  };

  return (
    <div>
      <Label htmlFor="type">Тип</Label>
      <Select name="name" value={currentType} onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent>
          {typesWithAll.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
