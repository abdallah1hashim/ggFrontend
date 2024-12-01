import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../../../components/ui/table";
import { EditableRow, ReadOnlyRow } from "./Row";

interface PageTableProps<T> {
  rows: T[];
  columns: any[];
  fields: any[];
  editingRow: T | null;
  setEditingRow: React.Dispatch<React.SetStateAction<T | null>>;
  onUpdateRow: () => void;
  onDeleteRow: (id: number) => void;
}

const PageTable = <T extends { id: number }>({
  rows,
  columns,
  fields,
  editingRow,
  setEditingRow,
  onUpdateRow,
  onDeleteRow,
}: PageTableProps<T>) => (
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
          <TableCell>{row.id}</TableCell>
          {editingRow?.id === row.id ? (
            <EditableRow
              editingRow={editingRow}
              fields={fields}
              setEditingRow={setEditingRow}
              onUpdateRow={onUpdateRow}
            />
          ) : (
            <ReadOnlyRow
              row={row}
              onEdit={() => setEditingRow(row)}
              onDelete={() => onDeleteRow(row.id)}
              fields={fields}
            />
          )}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PageTable;
