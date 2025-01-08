import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

function StoreBreadCrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <>
            <BreadcrumbItem key={index}>
              <Link
                className={`font-bold ${paths[paths.length - 1] === path ? "text-primary hover:text-primary-800" : "text-primary-400 hover:text-primary-400"}`}
                to={`/${path === "" ? "" : index > 1 ? paths.slice(1, index + 1).join("/") : path}`}
              >
                {path === ""
                  ? "Home"
                  : path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}
              </Link>
            </BreadcrumbItem>
            {index === paths.length - 1 ? null : <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default StoreBreadCrumb;
