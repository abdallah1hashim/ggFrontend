import { ArrowBigLeft } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import React from "react";
interface BackButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Button>,
    "onClick" | "children" | "variant"
  > {}

const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  const navigate = useNavigate();
  // functon to go back
  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <Button onClick={handleBackButton} variant="ghost" {...props}>
      <ArrowBigLeft className="h-4 w-4" /> Back
    </Button>
  );
};

export default BackButton;
