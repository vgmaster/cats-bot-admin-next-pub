"use server"

import { createUser, getUserByLogin } from "@/entities/user";
import { type TRegistationData } from "../types/registrationData";
import { type TResponseMessage } from "@/shared/types/responseMessage";

export const registration = async (
  data: TRegistationData,
): Promise<TResponseMessage> => {
  try {
    const candidate = await getUserByLogin(data.login);
    if (candidate != null)
      return {
        message: "Пользователь уже существует",
      };
    const newUser = await createUser(data);
    if (newUser != null) {
      return {
        message: "Пользователь успешно зарегистрирован",
      };
    }
  } catch (error) {
    console.log(error)
    return {
      message: "При регистрации произошла ошибка",
    };
  }
  return {
    message: "Неизвестная ошибка",
  };
};
