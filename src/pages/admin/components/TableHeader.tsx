import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";

interface TableHeaderProps<T> {
  title: string;
  newRow: T;
  setNewRow: React.Dispatch<React.SetStateAction<T>>;
  onAddRow: () => void;
  fields: { key: string; label: string; placeholder: string }[];
  buttonLabel?: string;
}

const TableHeader = <T extends Record<string, any>>({
  title,
  newRow,
  setNewRow,
  onAddRow,
  fields,
  buttonLabel = "Add",
}: TableHeaderProps<T>) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">{title}</h2>
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New {title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {fields.map((field) => (
            <Input
              key={String(field.key)}
              placeholder={field.placeholder}
              value={(newRow[field.key] as string) || ""}
              onChange={(e) =>
                setNewRow({ ...newRow, [field.key]: e.target.value })
              }
            />
          ))}
          <Button onClick={onAddRow} className="w-full">
            Create {title}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);

export default TableHeader;
