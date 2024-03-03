"use client";

import { updateUserById, type TUser, deleteUserById } from "@/entities/user";
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
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TProps = {
  users: TUser[];
};

export const UsersTable = (props: TProps): JSX.Element => {
  const { users } = props;

  const router = useRouter();

  const onIsAdminChange = async (
    id: number,
    isAdmin: boolean,
  ): Promise<void> => {
    try {
      await updateUserById(id, { is_admin: !isAdmin });
      router.refresh();
      toast.success("Изменения сохранены");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Ошибка при сохранении");
        throw new Error(error.message);
      }
    }
  };

  const onDelete = async (id: number): Promise<void> => {
    try {
      await deleteUserById(id);
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
            <TableHead>Логин</TableHead>
            <TableHead>Админ</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Обновлен</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>
                <Switch
                  id="is_visible"
                  checked={user.is_admin}
                  onCheckedChange={async () => {
                    await onIsAdminChange(user.id, user.is_admin);
                  }}
                />
              </TableCell>
              <TableCell>
                {format(user.created_at, "dd.MM.yyyy-H:mm:ss")}
              </TableCell>
              <TableCell>
                {user.updated_at != null
                  ? format(user.created_at, "dd.MM.yyyy-H:mm:ss")
                  : ""}
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
                                await onDelete(user.id);
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
