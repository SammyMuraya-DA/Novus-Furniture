import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Chatbot from "@/components/Chatbot";
import AuthButton from "@/components/AuthButton";
import { ArrowRight, Star, Shield, Truck, Phone } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const Index = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = allProducts.slice(0, 6);
  const heroImage = allProducts.length > 0 ? allProducts[0].image : "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop";
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative bg-cover bg-center h-[70vh] flex items-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Space with <span className="text-amber-400">Novus Furniture</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover premium furniture and interior design solutions that bring your vision to life
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="h-8 w-8 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted furniture made with the finest materials and attention to detail.</p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Complimentary delivery within Nairobi and surrounding areas.</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">5-Year Warranty</h3>
              <p className="text-gray-600">Comprehensive warranty coverage for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
