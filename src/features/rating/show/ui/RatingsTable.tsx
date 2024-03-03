"use client";

import {
  deleteRatingById,
  getImageSrcByType,
  type TRating,
} from "@/entities/rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { PopupModal } from "./PopupModal";
import { ColumnHeader } from "./ColumnHeader";
import { useSortParams } from "../lib/hooks/useSortParams";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { toast } from "sonner";
import { PAGE_SIZE } from "@/entities/rating/const/pageSize";

type TProps = {
  data: TRating[];
  page: number;
  isAdmin: boolean;
};

export const RatingsTable = (props: TProps): JSX.Element => {
  const { data, page, isAdmin } = props;
  const router = useRouter();
  const { sort, order, createSortURL } = useSortParams();

  const onSort = (sort?: string, order?: string): void => {
    router.replace(createSortURL(sort, order));
  };

  const onDelete = async (id: number): Promise<void> => {
    try {
      await deleteRatingById(id);
      router.refresh();
      toast.success("Запись удалена");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Ошибка при удалении");
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            {isAdmin && (
              <>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </>
            )}
            <ColumnHeader
              field="id"
              title="ИД"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <ColumnHeader
              field="resource_type"
              title="Тип"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <ColumnHeader
              field="tag"
              title="Тег"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <ColumnHeader
              field="shows"
              title="Показов"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <ColumnHeader
              field="likes"
              title="Лайки"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <ColumnHeader
              field="dislikes"
              title="Дизлайки"
              sort={sort}
              order={order}
              onSort={onSort}
            />
            <TableHead>Видим</TableHead>
            <TableHead>Теги сайта</TableHead>
            <TableHead>Фото</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rating, index) => {
            const imageSrc = getImageSrcByType(
              rating.url,
              rating.resource_type,
            );

            return (
              <TableRow key={rating.id}>
                <TableCell>{(page - 1) * PAGE_SIZE + index + 1}</TableCell>
                {isAdmin && (
                  <>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger tabIndex={-1}>
                            <Button asChild size="sm" variant="ghost">
                              <Link href={`/ratings/${rating.id}/edit`}>
                                <Pencil size="18" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Редактировать</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button asChild size="sm" variant="ghost">
                                  <div>
                                    <Trash size="18" />
                                  </div>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogDescription>
                                    Вы уверены что хотите удалить запись?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Нет</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={async () => {
                                      await onDelete(rating.id);
                                    }}
                                  >
                                    Да
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Удалить</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </>
                )}
                <TableCell>{rating.id}</TableCell>
                <TableCell>{rating.resource_type}</TableCell>
                <TableCell>{rating.tag}</TableCell>
                <TableCell>{rating.shows}</TableCell>
                <TableCell>{rating.likes}</TableCell>
                <TableCell>{rating.dislikes}</TableCell>
                <TableCell>{rating.is_visible}</TableCell>
                <TableCell>{rating.raw_tags}</TableCell>
                <TableCell>{<PopupModal imageSrc={imageSrc} />}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
