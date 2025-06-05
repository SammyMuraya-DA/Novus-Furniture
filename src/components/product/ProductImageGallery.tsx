import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ProductImageGalleryProps {
  productId: string;
  productName: string;
}

const ProductImageGallery = ({ productId, productName }: ProductImageGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Fetch images from the database
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/images`);
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    fetchImages();
  }, [productId]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/products/${productId}/images`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages((prev) => [...prev, newImage.url]);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        {images.length > 0 ? (
          <img src={images[selectedImage]} alt={productName} className="w-full h-full object-cover" />
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? "border-amber-600" : "border-gray-200"
              }`}
            >
              <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Upload new image */}
      <div className="flex justify-center">
        <label className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Image
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
};

export default ProductImageGallery;
