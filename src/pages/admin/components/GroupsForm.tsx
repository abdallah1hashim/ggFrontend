import React from "react";
import { Group } from "../../../lib/types";
import { addGroup, editGroup } from "../../../api/groups";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import FormField from "../../../components/ui/FormField";
import { BaseDialogForm } from "./BaseDialogForm";
import { z } from "zod";

interface GroupsFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  selectedItem: Group | null;
}

const groupSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

const GroupsForm: React.FC<GroupsFormProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedItem,
}) => {
  return (
    <BaseDialogForm
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedItem={selectedItem}
      title="Group"
      queryKey="groups"
      schema={groupSchema}
      createMutation={addGroup}
      updateMutation={editGroup}
    >
      {({ values, errors, handleChange }) => (
        <div className="grid grid-cols-2 gap-4">
          <FormFieldWrapper>
            <FormField
              id="name"
              name="name"
              type="text"
              label="Group Name"
              placeholder="Enter group name"
              value={values.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </FormFieldWrapper>
        </div>
      )}
    </BaseDialogForm>
  );
};

export default GroupsForm;
