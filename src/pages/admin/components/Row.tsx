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
import ActivityIcon from "../../../components/ui/activityIcon";

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
      <Button size="icon" onClick={onUpdateRow}>
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
  keys: string[];
}

export const ReadOnlyRow = <T extends Record<string, any>>({
  row,
  onEdit,
  onDelete,
  keys,
}: ReadOnlyRowProps<T>) => (
  <>
    {keys.map((keys) => {
      const isBoolean = typeof row[keys] === "boolean";
      const isDate = typeof row[keys] === "string" && row[keys].includes("T");
      const formatedDate = isDate
        ? new Date(row[keys]).toLocaleDateString()
        : "";
      const data = isDate ? formatedDate : row[keys];
      return (
        <TableCell key={String(keys)}>
          {isBoolean ? <ActivityIcon state={data} /> : data}
        </TableCell>
      );
    })}
    <TableCell className="space-x-2 text-right">
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-red-500">
            <Trash2 className="h-4 w-4 text-primary-50" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-primary-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-primary-700 text-primary-50 hover:bg-primary-700/80 hover:text-primary-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="border-none bg-primary-700 text-red-500 hover:bg-primary-700/80 hover:text-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableCell>
  </>
);
