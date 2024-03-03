import { RatingsWidget } from "@/features/rating/show";

type TProps = {
  searchParams: {
    query?: string;
    page?: string;
    tag?: string;
    type?: string;
  };
};

export default async function Ratings(props: TProps): Promise<JSX.Element> {
  const { searchParams } = props;

  return (
    <div className="flex flex-col gap-4">
      <h1>Котики</h1>
      <RatingsWidget searchParams={searchParams} />
    </div>
  );
}
