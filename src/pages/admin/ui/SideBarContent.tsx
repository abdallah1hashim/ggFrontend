import {
  LayoutDashboard,
  PackageOpen,
  Users,
  Settings,
  Grid,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
const adminNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
  { name: "Products", icon: PackageOpen, path: "products" },
  { name: "Users", icon: Users, path: "users" },
  { name: "Categories", icon: Grid, path: "categories" },
];

function SideBarContent() {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <header className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </header>
      <nav className="grid items-start overflow-auto px-2 py-2 text-sm font-medium lg:px-4">
        {adminNavItems.map(({ name, icon: Icon, path }) => (
          <Link
            to={path}
            key={path}
            className="text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        ))}
      </nav>
      <footer className="border-t p-4">
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </footer>
    </div>
  );
}

export default SideBarContent;
