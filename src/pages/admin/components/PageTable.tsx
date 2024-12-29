import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { EditableRow, ReadOnlyRow } from "./Row";

interface PageTableProps<T> {
  rows: T[];
  columns: any[];
  fields?: any[];
  editingRow?: T | null;
  onEdit: (row: T) => void;
  onUpdateRow?: () => void;
  onDeleteRow: (id: number) => void;
}

const PageTable = <T extends { id: number }>({
  rows,
  columns,
  fields,
  editingRow,
  onEdit,
  onUpdateRow,
  onDeleteRow,
}: PageTableProps<T>) => {
  const keys = Object.keys(rows[0]).map((key) => key);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {editingRow?.id === row.id ? (
              <EditableRow
                editingRow={editingRow}
                fields={fields || []}
                setEditingRow={onEdit}
                onUpdateRow={onUpdateRow || (() => {})}
              />
            ) : (
              <ReadOnlyRow
                row={row}
                onEdit={() => onEdit(row)}
                onDelete={() => onDeleteRow(row.id)}
                keys={keys}
              />
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PageTable;
