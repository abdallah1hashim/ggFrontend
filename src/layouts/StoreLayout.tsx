import { Outlet } from "react-router-dom";
import StoreBreadCrumb from "../pages/store/compoenents/StoreBreadCrumb";
import Section from "../components/ui/Section";

function StoreLayout() {
  return (
    <div className="min-h-full grow bg-primary-50 text-primary">
      <div className="container">
        <div className="py-3">
          <StoreBreadCrumb />
        </div>
        <Section className="container mx-auto px-4 py-8">
          <Outlet />
        </Section>
      </div>
    </div>
  );
}

export default StoreLayout;
