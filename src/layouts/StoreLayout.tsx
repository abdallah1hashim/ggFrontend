import { Outlet } from "react-router-dom";

function StoreLayout() {
  return (
    <div>
      <div>store layout</div>
      <Outlet />
    </div>
  );
}

export default StoreLayout;
