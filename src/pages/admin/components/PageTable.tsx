import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ReadOnlyRow } from "./Row";

interface PageTableProps<T> {
  rows: T[];
  columns: any[];
  onEdit: (row: T) => void;
  onDeleteRow: (id: number) => void;
}

const PageTable = <T extends { id: number }>({
  rows,
  columns,
  onEdit,
  onDeleteRow,
}: PageTableProps<T>) => {
  const keys = Object.keys(rows[0]).map((key) => key);
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-primary">
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            className="transition-colors hover:bg-primary-800"
          >
            {
              <ReadOnlyRow
                row={row}
                onEdit={() => onEdit(row)}
                onDelete={() => onDeleteRow(row.id)}
                keys={keys}
              />
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PageTable;
