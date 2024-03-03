import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FrownIcon className="w-60 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Запись не найдена</p>
      <Link
        href="/ratings"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Назад
      </Link>
    </main>
  );
}
