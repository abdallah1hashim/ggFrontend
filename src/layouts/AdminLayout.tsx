import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import AdminHeader from "../pages/admin/ui/AdminHeader";
import SideBarContent from "../pages/admin/ui/SideBarContent";
import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { confirmedUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (!confirmedUser) {
        window.location.href = "/login";
        return;
      }
      if (confirmedUser.role !== "admin" && confirmedUser.role !== "staff") {
        window.location.href = "/";
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, [confirmedUser]);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SideBarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden w-64 bg-gray-100 md:block">
        <SideBarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default AdminLayout;
