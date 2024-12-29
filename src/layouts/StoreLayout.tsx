import { Outlet } from "react-router-dom";
import StoreBreadCrumb from "../pages/store/compoenents/StoreBreadCrumb";

function StoreLayout() {
  return (
    <div className="container">
      <StoreBreadCrumb />
      <Outlet />
    </div>
  );
}

export default StoreLayout;
