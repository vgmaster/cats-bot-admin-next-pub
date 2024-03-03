"use server";

import prisma from "@/shared/lib/db";
import { type TRating } from "../types/rating";
import { PAGE_SIZE } from "../const/pageSize";
import { type TFilterParams } from "../types/filterParams";
import { type TSortParams } from "../types/orderParams";
import { type TUpdateRating } from "../types/updateRating";

type TWhereObj = {
  raw_tags: object;
  tag?: string;
  resource_type?: string;
};

/**
 * Построитель объекта условий для запроса в БД
 */
const buildWhereObj = (props: TFilterParams): TWhereObj => {
  const { query, tag, type } = props;

  const whereObj: TWhereObj = {
    raw_tags: {
      contains: query,
    },
  };

  if (tag != null) {
    whereObj.tag = tag;
  }

  if (type != null) {
    whereObj.resource_type = type;
  }

  return whereObj;
};

const buildSortObj = (props: TSortParams): Record<string, "asc" | "desc"> => {
  const { sort, order } = props;

  const sortObj: Record<string, "asc" | "desc"> = {};

  if (sort != null && order != null) {
    sortObj[sort] = order;
  }

  return sortObj;
};

/**
 * Получение количества страниц с результатами при выбранных фильтрах
 */
export const getFilteredRatingsTotalPages = async (
  props: TFilterParams,
): Promise<number> => {
  const whereObj = buildWhereObj(props);

  try {
    const count = await prisma.rating.count({
      where: whereObj,
    });

    const totalPages = Math.ceil(count / PAGE_SIZE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of ratings.");
  }
};

/**
 * Получение данных с примененными фильтрами
 */
export const getFilteredRatings = async (
  filters: TFilterParams,
  sort: TSortParams,
): Promise<TRating[]> => {
  const { page } = filters;

  const whereObj = buildWhereObj(filters);
  const sortObj = buildSortObj(sort);

  const ratings = await prisma.rating.findMany({
    where: whereObj,
    orderBy: sortObj,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  return ratings;
};

/**
 * Получение уникальных значений тегов в таблице
 */
export const getTags = async (): Promise<string[]> => {
  try {
    const tags = await prisma.rating.findMany({
      select: {
        tag: true,
      },
      distinct: ["tag"],
    });

    const preparedTags: string[] = tags.map((tag) => tag.tag);

    return preparedTags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch uniq tags.");
  }
};

/**
 * Получение уникальных значений типов в таблице
 */
export const getTypes = async (): Promise<string[]> => {
  try {
    const types = await prisma.rating.findMany({
      select: {
        resource_type: true,
      },
      distinct: ["resource_type"],
    });

    const preparedTypes: string[] = types.map((type) => type.resource_type);

    return preparedTypes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch uniq types.");
  }
};

/**
 * Получение рейтинга по ИД
 */
export const getRatingById = async (id: number): Promise<TRating | null> => {
  try {
    const rating = await prisma.rating.findUnique({
      where: {
        id,
      },
    });

    return rating;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch uniq rating.");
  }
};

/**
 * Обновление рейтинга по ИД
 */
export const updateRatingById = async (
  id: number,
  data: TUpdateRating,
): Promise<TRating | null> => {
  try {
    const rating = await prisma.rating.update({
      where: {
        id,
      },
      data,
    });

    return rating;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update rating with id=${id}`);
  }
};

/**
 * Удаление рейтинга по ИД
 */
export const deleteRatingById = async (id: number): Promise<void> => {
  try {
    await prisma.rating.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete rating with id=${id}`);
  }
};
