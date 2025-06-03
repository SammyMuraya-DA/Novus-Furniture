
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cartItems, totalItems, totalAmount, updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </span>
          <Badge variant="secondary">{totalItems} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
            {item.product_image && (
              <img 
                src={item.product_image} 
                alt={item.product_name}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.product_name}</h4>
              <p className="text-sm text-gray-600">{formatPrice(item.product_price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>
        
        <Link to="/cart/checkout" className="w-full">
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Cart;
