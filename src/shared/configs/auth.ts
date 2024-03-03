import { getUserById } from "@/entities/user";
import { validateUser } from "@/features/login";
import { type TLoginData } from "@/features/login/types/loginData";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        login: { label: "login", type: "text", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          const user = await validateUser(credentials as TLoginData);
          if (user != null) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userFromDB = await getUserById(Number(token.sub));
      session.user.login = userFromDB?.login;
      session.user.isAdmin = userFromDB?.is_admin;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
