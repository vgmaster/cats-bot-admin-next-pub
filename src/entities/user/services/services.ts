"use server";

import * as bcrypt from "bcrypt";
import prisma from "@/shared/lib/db";
import { type TCreateUser } from "../types/createUser";
import { type TUser } from "../types/user";
import { type TUpdateUser } from "../types/updateUser";

export const getUserByLogin = async (login: string): Promise<TUser | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: { login },
    });

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch user by login=${login}`);
  }
};

export const getUserById = async (id: number): Promise<TUser | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch user by id=${id}`);
  }
};

export const createUser = async (dto: TCreateUser): Promise<TUser> => {
  const hashPassword = await bcrypt.hash(dto.password, 10);
  const user = await prisma.user.create({
    data: {
      login: dto.login,
      password: hashPassword,
    },
  });

  return user;
};

export const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all users.");
  }
};

export const updateUserById = async (
  id: number,
  data: TUpdateUser,
): Promise<TUser | null> => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update user with id=${id}`);
  }
};

export const deleteUserById = async (id: number): Promise<void> => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete user with id=${id}`);
  }
};
