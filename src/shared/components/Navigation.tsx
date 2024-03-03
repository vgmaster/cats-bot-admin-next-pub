"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

export const Navigation = ({ navLinks }: Props): JSX.Element => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <nav className="flex justify-center gap-6">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn("p-2", isActive && "bg-gray-200")}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.data != null && (
        <Link
          href="/ratings"
          className={cn("p-2", pathname === "/ratings" && "bg-gray-200")}
        >
          Котики
        </Link>
      )}
      {session?.data != null ? (
        <Link
          href="#"
          onClick={async (): Promise<undefined> => {
            await signOut({ callbackUrl: "/" });
          }}
          className="p-2"
        >
          Выйти
        </Link>
      ) : (
        <Link href="/auth/login" className="p-2">
          Войти
        </Link>
      )}
    </nav>
  );
};
