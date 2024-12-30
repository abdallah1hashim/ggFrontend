import { createUser, editUser } from "../../../api/user";
import FormField from "../../../components/ui/FormField";
import FormFieldWrapper from "../../../components/ui/FormFieldWrapper";
import FormSelect from "../../../components/ui/FormSelect";
import { UserAdminSide } from "../../../validators/Schemas";
import { BaseDialogForm } from "./BaseDialogForm";

function UserForm({ isDialogOpen, setIsDialogOpen, selectedItem }: any) {
  return (
    <BaseDialogForm
      title="User"
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedItem={selectedItem}
      queryKey="users"
      schema={UserAdminSide}
      createMutation={createUser}
      updateMutation={editUser}
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
              error={errors.name}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormSelect
              id="role"
              name="role"
              label="Role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "staff", label: "Staff" },
                { value: "customer", label: "Customer" },
              ]}
              value={values.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </FormFieldWrapper>
        </div>
      )}
    </BaseDialogForm>
  );
}

export default UserForm;
