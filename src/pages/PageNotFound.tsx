import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Button
        className="mt-6 bg-primary text-white hover:bg-primary/90"
        onClick={goHome}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default PageNotFound;
