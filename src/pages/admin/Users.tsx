import { deleteUser, getUsers } from "../../api/user";
import ManagementPage from "./components/ManagementPage";
import UserForm from "./components/UserForm";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "User Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "isActive", label: "Active" },
  { key: "createdAt", label: "Created At" },
];

function Users() {
  return (
    <ManagementPage
      title="Users"
      queryKey="users"
      columns={columns}
      fetchData={getUsers}
      deleteData={deleteUser}
      dataKey="users"
      FormComponent={UserForm}
    />
  );
}

export default Users;
