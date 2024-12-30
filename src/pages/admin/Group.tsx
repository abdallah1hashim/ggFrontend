import React from "react";
import type { Group as GroupT } from "../../lib/types";
import { fetchGroups, deleteGroup } from "../../api/groups";
import GroupsForm from "./components/GroupsForm";
import ManagementPage from "./components/ManagementPage";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Groups Name" },
];

const Group: React.FC = () => {
  return (
    <ManagementPage<GroupT & { id: number }>
      title="Groups"
      queryKey="groups"
      columns={columns}
      fetchData={fetchGroups}
      deleteData={deleteGroup}
      FormComponent={GroupsForm}
      dataKey="groups"
    />
  );
};

export default Group;
