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
      {({ values, errors, handleChange }) => {
        return (
          <div className="grid grid-cols-2 gap-4">
            <FormFieldWrapper>
              <FormField
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Enter name"
                value={values.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email"
                value={values.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter password"
                value={values.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
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
            <FormFieldWrapper>
              <FormField
                id="is_active"
                name="is_active"
                type="checkbox"
                className="mr-auto h-12 w-8 checked:bg-white"
                checked={values.is_active ? true : false}
                label="Account Status"
                additionalLabel={values.is_active ? "Active" : "Inactive"}
                placeholder="Toggle account status"
                onChange={(e) => handleChange("is_active", e.target.checked)}
                error={errors.is_active}
              />
            </FormFieldWrapper>
          </div>
        );
      }}
    </BaseDialogForm>
  );
}

export default UserForm;
