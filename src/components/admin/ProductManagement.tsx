
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load products from localStorage or use default products
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Import default products
      import("@/data/products").then((module) => {
        setProducts(module.products);
        localStorage.setItem("products", JSON.stringify(module.products));
      });
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    // Trigger custom event to notify other components
    window.dispatchEvent(new CustomEvent("productsUpdated"));
  };

  const handleAddProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productData.name || "",
      category: productData.category || "other",
      price: productData.price || 0,
      originalPrice: productData.originalPrice,
      image: productData.image || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      images: [productData.image || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"],
      description: productData.description || "",
      features: productData.features || [],
      dimensions: productData.dimensions || "",
      material: productData.material || "",
      color: productData.color || "",
      inStock: productData.inStock !== false,
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setIsAddingNew(false);
    toast({
      title: "Product Added",
      description: "New product has been added successfully",
    });
  };

  const handleUpdateProduct = (productData: Partial<Product>) => {
    if (!editingProduct) return;

    const updatedProducts = products.map(product =>
      product.id === editingProduct.id
        ? { ...product, ...productData }
        : product
    );
    saveProducts(updatedProducts);
    setEditingProduct(null);
    toast({
      title: "Product Updated",
      description: "Product has been updated successfully",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    saveProducts(updatedProducts);
    toast({
      title: "Product Deleted",
      description: "Product has been deleted successfully",
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingProduct(null);
  };

  if (isAddingNew || editingProduct) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={() => setIsAddingNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductManagement;
