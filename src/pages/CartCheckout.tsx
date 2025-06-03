
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const CartCheckout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to place an order",
          variant: "destructive",
        });
        return;
      }

      // Convert cart items to plain objects for JSON storage
      const orderItemsJson = cartItems.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.product_price,
        quantity: item.quantity,
        product_image: item.product_image || null,
      }));

      // Create order
      const orderData = {
        user_id: user.id,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email || null,
        customer_phone: customerInfo.phone,
        order_items: orderItemsJson as any, // Cast to any to satisfy Json type
        total_amount: totalAmount,
        status: 'pending',
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      // Send WhatsApp invoice
      await supabase.functions.invoke('send-invoice', {
        body: {
          orderId: order.id,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          orderItems: cartItems,
          totalAmount: totalAmount,
        },
      });

      // Clear cart
      clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: "Invoice has been sent to your WhatsApp number",
      });

      navigate('/');
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.product_name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.product_price)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.product_price * item.quantity)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="Enter your email (optional)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+254..."
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Invoice will be sent to this WhatsApp number
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartCheckout;
