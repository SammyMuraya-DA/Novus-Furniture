
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Chatbot from "@/components/Chatbot";
import AuthButton from "@/components/AuthButton";
import { products } from "@/data/products";
import { ArrowRight, Star, Shield, Truck, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/data/products";

const Index = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage or use default products
    const loadProducts = () => {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        setAllProducts(JSON.parse(savedProducts));
      } else {
        setAllProducts(products);
        localStorage.setItem("products", JSON.stringify(products));
      }
      setLoading(false);
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

  const featuredProducts = allProducts.slice(0, 6);
  
  // Use the first product's image as hero background, or fallback to default
  const heroImage = allProducts.length > 0 ? allProducts[0].image : "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop";
  const heroTitle = "Transform Your Space with Novus Furnature";
  const heroDescription = "Discover premium furniture and interior design solutions that bring your vision to life";

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative bg-cover bg-center h-[70vh] flex items-center"
          style={{
            backgroundImage: `url('${heroImage}')`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {heroTitle.split(' ').slice(0, -2).join(' ')}
              <span className="text-amber-400 block">{heroTitle.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
                onClick={() => window.open('https://wa.me/254708921377?text=Hi, I would like to schedule a consultation', '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Consultation
              </Button>
              <div className="mt-4 sm:mt-0">
                <AuthButton />
              </div>
            </div>
            <p className="text-sm mt-4 opacity-80">
              Sign up to track your orders and get exclusive updates
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted furniture made with the finest materials and attention to detail.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Complimentary delivery and setup service within Nairobi and surrounding areas.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5-Year Warranty</h3>
              <p className="text-gray-600">Comprehensive warranty coverage on all our furniture pieces for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular furniture pieces, carefully selected for style and comfort
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let our design experts help you create the perfect living space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
              onClick={() => window.open('https://wa.me/254708921377?text=Hi, I would like to get a quote for interior design services', '_blank')}
            >
              <Phone className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
