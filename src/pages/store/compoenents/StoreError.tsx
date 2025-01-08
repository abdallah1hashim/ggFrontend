import React from "react";
import { XCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";

interface StoreErrorProps {
  message?: string;
  reset?: () => void;
}

const StoreError: React.FC<StoreErrorProps> = ({
  message = "Something went wrong while loading the store.",
  reset,
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <XCircle className="h-5 w-5" />
        <AlertTitle className="mb-2 text-lg font-semibold">
          Store Error
        </AlertTitle>
        <AlertDescription className="space-y-4">
          <p className="text-sm">{message}</p>
          {reset && (
            <Button variant="outline" onClick={reset} className="mt-2 w-full">
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default StoreError;
