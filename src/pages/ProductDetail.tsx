
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductActions from "@/components/product/ProductActions";
import { Product } from "@/data/products";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = () => {
      const savedProducts = localStorage.getItem("products");
      let products: Product[] = [];
      
      if (savedProducts) {
        products = JSON.parse(savedProducts);
      } else {
        // Import default products if none exist
        import("@/data/products").then((module) => {
          products = module.products;
          localStorage.setItem("products", JSON.stringify(module.products));
          const foundProduct = products.find((p) => p.id === id);
          setProduct(foundProduct || null);
          setLoading(false);
        });
        return;
      }
      
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    };

    loadProduct();

    // Listen for storage changes to update product in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "products") {
        loadProduct();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events for same-tab updates
    const handleProductsUpdate = () => {
      loadProduct();
    };

    window.addEventListener("productsUpdated", handleProductsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("productsUpdated", handleProductsUpdate);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Return to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link to="/products" className="hover:text-amber-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              description={product.description}
              inStock={product.inStock}
            />

            <ProductFeatures
              features={product.features}
              dimensions={product.dimensions}
              material={product.material}
              color={product.color}
            />

            <Separator />

            <ProductActions
              productName={product.name}
              productDescription={product.description}
              inStock={product.inStock}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
