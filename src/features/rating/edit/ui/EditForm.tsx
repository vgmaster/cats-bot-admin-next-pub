"use client";

import { format } from "date-fns";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TEditForm, schemaEditForm } from "../types/editForm";
import {
  updateRatingById,
  type TRating,
  getImageSrcByType,
} from "@/entities/rating";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { mapEditDataFromForm } from "../lib/mapEditDataFromForm";
import { PopupModal } from "@/features/rating/show/ui/PopupModal";
import { toast } from "sonner";

type TProps = {
  rating: TRating;
};

export const EditForm = (props: TProps): JSX.Element => {
  const { rating } = props;

  const form = useForm<TEditForm>({
    mode: "onBlur",
    resolver: zodResolver(schemaEditForm),
    defaultValues: {
      id: rating.id,
      url: rating.url,
      resource_type: rating.resource_type,
      tag: rating.tag,
      shows: rating.shows,
      likes: rating.likes,
      dislikes: rating.dislikes,
      is_visible: rating.is_visible,
      raw_tags: rating.raw_tags,
      created_at:
        rating.created_at != null
          ? format(rating.created_at, "dd.MM.yyyy-H:mm:ss")
          : "",
      updated_at:
        rating.updated_at != null
          ? format(rating.updated_at, "dd.MM.yyyy-H:mm:ss")
          : "",
    },
  });

  const onSubmit: SubmitHandler<TEditForm> = async (data: TEditForm) => {
    try {
      const mappedData = mapEditDataFromForm(data);
      await updateRatingById(rating.id, mappedData);
      toast.success("Изменения сохранены");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Ошибка при сохранении");
        throw new Error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-w-[50%] flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ИД</FormLabel>
              <FormControl>
                <Input placeholder="ИД" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => {
            const imageSrc = getImageSrcByType(
              field.value,
              rating.resource_type,
            );
            return (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <div>
                  <PopupModal imageSrc={imageSrc} />
                </div>
                <FormControl>
                  <Input type="text" placeholder="URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="resource_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Тип" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тег</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Тег" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Показов</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Показов"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="likes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Лайков</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Лайков" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dislikes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дизлайков</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Дизлайков" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_visible"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel className="flex items-center pr-4">Видим</FormLabel>
              <FormControl>
                <Switch
                  id="is_visible"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raw_tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Теги сайта</FormLabel>
              <FormControl>
                <Textarea placeholder="Теги сайта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="created_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Время создания</FormLabel>
              <FormControl>
                <Input placeholder="Время создания" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="updated_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Время обновления</FormLabel>
              <FormControl>
                <Input placeholder="Время обновления" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
};
