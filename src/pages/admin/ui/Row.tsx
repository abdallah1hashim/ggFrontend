import React from "react";
import { Check, X, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

import { Input } from "../../../components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { TableCell } from "../../../components/ui/table";

export const EditableRow: React.FC<{
  editingRow: any;
  fields: { key: string; label: string; placeholder: string }[];
  setEditingRow: React.Dispatch<React.SetStateAction<any | null>>;
  onUpdateRow: () => void;
}> = ({ editingRow, fields, setEditingRow, onUpdateRow }) => (
  <>
    {fields.map((field) => (
      <TableCell key={field.key}>
        <Input
          placeholder={field.placeholder}
          value={editingRow[field.key] || ""}
          onChange={(e) =>
            setEditingRow({
              ...editingRow,
              [field.key]: e.target.value,
            })
          }
        />
      </TableCell>
    ))}
    <TableCell className="space-x-2 text-right">
      <Button variant="outline" size="icon" onClick={onUpdateRow}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setEditingRow(null)}>
        <X className="h-4 w-4" />
      </Button>
    </TableCell>
  </>
);

// Read-Only Row Component
interface ReadOnlyRowProps<T> {
  row: T;
  onEdit: () => void;
  onDelete: () => void;
  fields: { key: keyof T; label: string; placeholder: string }[];
}

export const ReadOnlyRow = <T extends Record<string, any>>({
  row,
  onEdit,
  onDelete,
  fields,
}: ReadOnlyRowProps<T>) => (
  <>
    {fields.map((field) => (
      <TableCell key={String(field.key)}>{row[field.key]}</TableCell>
    ))}
    <TableCell className="space-x-2 text-right">
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableCell>
  </>
);
