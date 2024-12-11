import { Link, Outlet } from "react-router-dom";
import { Card, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import BackButton from "../components/ui/BackButton";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <BackButton className="w-fit" />
          <CardTitle className="text-center text-2xl font-bold">
            {location.pathname.split("/")[1].toUpperCase()}
          </CardTitle>
        </CardHeader>
        <Outlet />
        <CardFooter>
          <div className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-primary/80"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthLayout;
