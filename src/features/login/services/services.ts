"use server";

import * as bcrypt from "bcrypt";
import { type TLoginData } from "../types/loginData";
import { getUserByLogin } from "@/entities/user";
import { mapUserToAuthUser } from '../lib/mapUserToAuthUser';
import { type User } from 'next-auth';

export const validateUser = async (data: TLoginData): Promise<User | undefined> => {
  try {
    const user = await getUserByLogin(data.login);
    if (user == null) {
      throw new Error("Некорректный логин или пароль");
    }
    const passwordEquals = await bcrypt.compare(data.password, user.password);
    if (user != null && passwordEquals) {
      return mapUserToAuthUser(user);
    }
  } catch (error) {
    throw new Error("Некорректный логин или пароль");
  }
};
