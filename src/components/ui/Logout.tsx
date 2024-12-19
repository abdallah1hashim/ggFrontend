import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Logout() {
  const { logout } = useAuth();
  return (
    <div onClick={logout} className="text-destructive inline-flex">
      <LogOut className="mr-2 h-4 w-4" /> Logout
    </div>
  );
}

export default Logout;
