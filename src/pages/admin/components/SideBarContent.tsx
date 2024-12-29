import {
  LayoutDashboard,
  PackageOpen,
  Users,
  Settings,
  Grid,
  LogOut,
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
    <div className="flex h-full max-h-screen flex-col gap-2 bg-primary text-primary-50 hover:text-primary-100">
      <header className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </header>
      <nav className="grid items-start overflow-auto px-2 py-2 text-sm font-medium lg:px-4">
        {adminNavItems.map(({ name, icon: Icon, path }) => (
          <Link
            to={path}
            key={path}
            className="text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        ))}
      </nav>
      <footer className="flex flex-col gap-2 border-t p-4">
        <Button
          variant="outline"
          className="w-full bg-primary-50 text-primary hover:text-primary/70"
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
        <Button
          variant="outline"
          className="w-full bg-primary-50 text-red-500 hover:text-red-500/70"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </footer>
    </div>
  );
}

export default SideBarContent;
