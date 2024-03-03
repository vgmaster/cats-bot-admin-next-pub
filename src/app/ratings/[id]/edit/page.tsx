import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getRatingById } from "@/entities/rating";
import { EditForm } from "@/features/rating/edit/ui/EditForm";
import { authConfig } from "@/shared/configs/auth";

type TProps = {
  params: { id: string };
};

export default async function EditPage(props: TProps): Promise<JSX.Element> {
  const { params } = props;
  const id = params.id;

  const session = await getServerSession(authConfig);
  const isAdmin = Boolean(session?.user.isAdmin);

  if (!isAdmin) {
    notFound();
  }

  const rating = await getRatingById(Number(id));

  if (rating == null) {
    notFound();
  }
  return (
    <div className="min-w-[50%]">
      <h1>Редактирование записи с ID={rating.id}</h1>
      <EditForm rating={rating} />
    </div>
  );
}
