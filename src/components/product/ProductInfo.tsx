
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductInfoProps {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  inStock: boolean;
}

const ProductInfo = ({ name, category, price, originalPrice, description, inStock }: ProductInfoProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            {category}
          </Badge>
          {discountPercentage > 0 && (
            <Badge className="bg-red-500">
              -{discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-amber-600">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <Badge variant={inStock ? "default" : "secondary"}>
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-sm text-gray-600 ml-2">(4.8/5 - 24 reviews)</span>
        </div>
      </div>

      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default ProductInfo;
