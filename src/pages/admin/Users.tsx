import { deleteUser, getUsers } from "../../api/user";
import ManagementPage from "./components/ManagementPage";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "User Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
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
    />
  );
}

export default Users;
