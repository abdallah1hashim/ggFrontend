import React from "react";
import { Package } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

interface NoItemsFoundProps {
  title?: string;
  description?: string;
}

const NoItemsFound: React.FC<NoItemsFoundProps> = ({
  title = "No Items Found",
  description = "We couldn't find any items matching your criteria.",
}) => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
          <Package className="text-muted-foreground h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        {/* {onAction && (
          <Button
            onClick={onAction}
            variant="outline"
            className="mt-4"
          >
            {actionLabel}
          </Button>
        )} */}
      </CardContent>
    </Card>
  );
};

export default NoItemsFound;
