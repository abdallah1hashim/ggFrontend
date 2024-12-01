import React, { useState, useRef } from "react";
import { Button } from "../../../components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import { ProductImage } from "../../../types/productTypes";

interface ProductImageUploaderProps {
  productId?: number;
  onImagesUpdate: (images: ProductImage[]) => void;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  productId,
  onImagesUpdate,
}) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ProductImage[] = Array.from(files).map(
        (file, index) => ({
          product_id: productId || 0,
          image_url: URL.createObjectURL(file),
          is_primary: index === 0,
        }),
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesUpdate(updatedImages);
    }
  };

  const handleRemoveImage = (imageToRemove: ProductImage) => {
    const updatedImages = images.filter(
      (img) => img.image_url !== imageToRemove.image_url,
    );
    setImages(updatedImages);
    onImagesUpdate(updatedImages);
  };

  const handleSetPrimaryImage = (primaryImage: ProductImage) => {
    const updatedImages = images.map((img) => ({
      ...img,
      is_primary: img.image_url === primaryImage.image_url,
    }));
    setImages(updatedImages);
    onImagesUpdate(updatedImages);
  };

  return (
    <div>
      <div className="mb-4">
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <ImagePlus className="mr-2" /> Upload Images
        </Button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative rounded border ${
              image.is_primary ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img
              src={image.image_url}
              alt={`Product Image ${index + 1}`}
              className="h-32 w-full rounded object-cover"
            />
            <div className="absolute right-1 top-1 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/50 hover:bg-white"
                onClick={() => handleRemoveImage(image)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              {!image.is_primary && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/50 hover:bg-white"
                  onClick={() => handleSetPrimaryImage(image)}
                >
                  Set Primary
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUploader;
