import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "../components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import AdminHeader from "../pages/admin/ui/AdminHeader";
import SideBarContent from "../pages/admin/ui/SideBarContent";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="fixed left-3 top-3 z-50 md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <SideBarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="bg-muted/40 hidden border-r md:block">
        <SideBarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
