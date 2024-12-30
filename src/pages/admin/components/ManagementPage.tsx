import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import PageTable from "./PageTable";
import { toast } from "../../../hooks/use-toast";

interface Column {
  key: string;
  label: string;
}

interface ManagementPageProps<T extends { id: number }> {
  title: string;
  queryKey: string;
  columns: Column[];
  fetchData: () => Promise<{ [key: string]: T[] }>;
  deleteData: (id: number) => Promise<void>;
  FormComponent?: React.ComponentType<{
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    selectedItem: any;
  }>;
  FormCreateComponent?: React.ComponentType<{
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    selectedItem: any;
  }>;
  FormEditComponent?: React.ComponentType<{
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    selectedItem: any;
  }>;
  dataKey: string;
  additionalFormProps?: any;
}

function ManagementPage<T extends { id: number }>({
  title,
  queryKey,
  columns,
  fetchData,
  deleteData,
  FormComponent,
  FormCreateComponent,
  FormEditComponent,
  dataKey,
  additionalFormProps = {},
}: ManagementPageProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<{ [key: string]: T[] }, Error>(
    [queryKey],
    fetchData,
  );

  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEdit = useCallback((item: T) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {error && !isLoading && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load {title}. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-primary text-primary-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title} Management 🫡</CardTitle>
            <Button onClick={handleAdd} aria-label={`Add New ${title}`}>
              <Plus className="mr-2" /> Add New {title}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <p>Loading {title}...</p>
            </div>
          ) : (
            <PageTable
              rows={data?.[dataKey] || []}
              columns={columns}
              onEdit={handleEdit}
              onDeleteRow={handleDelete}
            />
          )}
        </CardContent>
      </Card>
      <div>
        {FormComponent ? (
          <FormComponent
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            selectedItem={selectedItem}
            {...additionalFormProps}
          />
        ) : FormCreateComponent ? (
          <FormCreateComponent
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            selectedItem={selectedItem}
            {...additionalFormProps}
          />
        ) : FormEditComponent ? (
          <FormEditComponent
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            selectedItem={selectedItem}
            {...additionalFormProps}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ManagementPage;
