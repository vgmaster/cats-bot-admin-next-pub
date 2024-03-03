import { TableHead } from "@/shared/ui/table";

type TProps = {
  field: string;
  title: string;
  sort: string | null;
  order: string | null;
  onSort: (sort?: string, order?: string) => void;
};

export const ColumnHeader = (props: TProps): JSX.Element => {
  const { field, title, sort, order, onSort } = props;

  const handleClick = (): void => {
    if (order == null || sort !== field) {
      onSort(field, "asc");
    } else if (order === "asc") {
      onSort(field, "desc");
    } else {
      onSort();
    }
  };

  return (
    <TableHead onClick={handleClick} className="cursor-pointer whitespace-nowrap">
      {title}
      {sort === field && order === "asc" && " ↑"}
      {sort === field && order === "desc" && " ↓"}
    </TableHead>
  );
};
