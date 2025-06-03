
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { Upload, X } from "lucide-react";

interface ProductFormProps {
  product?: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || undefined,
    image: product?.image || "",
    images: product?.images || [],
    description: product?.description || "",
    features: product?.features?.join(", ") || "",
    dimensions: product?.dimensions || "",
    material: product?.material || "",
    color: product?.color || "",
    inStock: product?.inStock !== false,
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>(product?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Please use images under 5MB`);
          continue;
        }

        // Convert to base64
        const base64 = await convertToBase64(file);
        newImages.push(base64);
      }

      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      setFormData({
        ...formData,
        image: updatedImages[0] || "",
        images: updatedImages
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    setFormData({
      ...formData,
      image: updatedImages[0] || "",
      images: updatedImages
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    onSave({
      ...formData,
      image: uploadedImages[0],
      images: uploadedImages,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (KES)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price (KES)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <Label>Product Images</Label>
            <div className="mt-2 space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {isUploading ? "Uploading..." : "Click to upload images or drag and drop"}
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</span>
                </label>
              </div>

              {/* Image Preview */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Input
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isUploading || uploadedImages.length === 0}>
              {product ? "Update" : "Add"} Product
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
