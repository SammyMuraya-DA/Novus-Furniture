
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Chatbot from "@/components/Chatbot";
import { Product, categories } from "@/data/products";
import { Search, Filter } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load products from localStorage or use default products
    const loadProducts = () => {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // Import default products if none exist
        import("@/data/products").then((module) => {
          setProducts(module.products);
          localStorage.setItem("products", JSON.stringify(module.products));
        });
      }
    };

    loadProducts();

    // Listen for storage changes to update products in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "products") {
        loadProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events for same-tab updates
    const handleProductsUpdate = () => {
      loadProducts();
    };

    window.addEventListener("productsUpdated", handleProductsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("productsUpdated", handleProductsUpdate);
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Our Product Collection
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Explore our extensive range of premium furniture designed to elevate your living spaces
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filter by category</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products found matching your criteria.</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;
