import React, { useState, useEffect } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../hooks/use-toast";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";

interface BaseDialogFormProps<T extends z.ZodType> {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  selectedItem: z.infer<T> | null;
  title: string;
  description?: string;
  queryKey: string;
  schema: T;
  createMutation: (data: z.infer<T>) => Promise<any>;
  updateMutation: (data: { id: number; data: z.infer<T> }) => Promise<any>;
  children: (formProps: {
    values: z.infer<T>;
    errors: Record<string, string>;
    handleChange: (field: string, value: any) => void;
  }) => React.ReactNode;
}

export function BaseDialogForm<T extends z.ZodType>({
  isDialogOpen,
  setIsDialogOpen,
  selectedItem,
  title,
  description,
  queryKey,
  schema,
  createMutation,
  updateMutation,
  children,
}: BaseDialogFormProps<T>) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<z.infer<T>>({} as z.infer<T>);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(selectedItem || ({} as z.infer<T>));
    setErrors({});
  }, [selectedItem]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear field error when value changes
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const updateMutationHook = useMutation(updateMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast({
        title: "Success",
        description: `${title} updated successfully`,
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const createMutationHook = useMutation(createMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast({
        title: "Success",
        description: `${title} created successfully`,
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmitError = (result: z.SafeParseReturnType<any, any>) => {
    const formattedErrors: Record<string, string> = {};
    result.error?.errors.forEach((error) => {
      formattedErrors[error.path[0] as string] = error.message;
    });
    setErrors(formattedErrors);
    toast({
      title: "Error",
      description: result.error?.message || "An error occurred",
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = schema.safeParse(values);
    console.log(result);
    if (!result.success) {
      handleSubmitError(result);
      return;
    }
    console.log("clicked");

    if (selectedItem?.id) {
      updateMutationHook.mutate({ id: selectedItem.id, data: values });
    } else {
      createMutationHook.mutate(values);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="overflow-auto bg-primary-800 text-primary-50 sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {selectedItem?.id ? `Edit ${title}` : `Add New ${title}`}
          </DialogTitle>
          <DialogDescription>
            {description ||
              `Fill in this form to ${selectedItem?.id ? "edit" : "create"} a ${
                selectedItem?.id ? title : `new ${title}`
              }`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {children({
            values,
            errors,
            handleChange,
          })}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="text-red-500"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateMutationHook.isLoading || createMutationHook.isLoading
              }
            >
              {selectedItem?.id ? "Update" : "Create"} {title}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
