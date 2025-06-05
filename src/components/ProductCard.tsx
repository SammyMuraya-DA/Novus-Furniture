import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShoppingCart, Loader } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(price);

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const { addToCart, isAddingToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const discountPercentage =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth"); // Proper navigation instead of window.location.href
      return;
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
    });
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {discountPercentage > 0 && (
        <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white">
          -{discountPercentage}%
        </Badge>
      )}

      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy" // Lazy loading for performance
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Badge variant={product.inStock ? "default" : "secondary"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button className="w-full" variant="outline">
              View Details
            </Button>
          </Link>

          {product.inStock && (
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-amber-600 hover:bg-amber-700"
              aria-label="Add to cart"
            >
              {isAddingToCart ? <Loader className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
          )}

          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() =>
              window.open(
                `https://wa.me/254708921377?text=Hi, I'm interested in the ${product.name}`,
                "_blank"
              )
            }
            aria-label="Contact seller on WhatsApp"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
