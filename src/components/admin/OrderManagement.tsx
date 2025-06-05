import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, ExternalLink } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  order_items: any[];
  total_amount: number;
  status: string;
  invoice_sent: boolean | null;
  created_at: string;
}

const OrderManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  // Place a new order
  const placeOrderMutation = useMutation({
    mutationFn: async (newOrder: Partial<Order>) => {
      const { data, error } = await supabase.from('orders').insert([newOrder]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: "Order Placed", description: "Your order has been successfully submitted!" });
    },
  });

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: (_, { orderId, newStatus }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });

      const order = orders.find(o => o.id === orderId);
      if (order && newStatus === "processing") {
        sendNotification(order);
      }

      toast({ title: "Order Updated", description: `Order status changed to ${newStatus}` });
    },
  });

  const sendNotification = (order: Order) => {
    const message = `Hello ${order.customer_name}, your order #${order.id} is now being processed. Thank you for choosing Novus Furniture!`;
    const whatsappUrl = `https://wa.me/${order.customer_phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({ title: "Notification Sent", description: `WhatsApp notification sent to ${order.customer_name}` });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>

      {/* Order Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Place an Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              placeOrderMutation.mutate({
                customer_name: formData.get("name") as string,
                customer_email: formData.get("email") as string,
                customer_phone: formData.get("phone") as string,
                order_items: [{ product_name: formData.get("product"), quantity: Number(formData.get("quantity")) }],
                total_amount: Number(formData.get("amount")),
                status: "pending",
                created_at: new Date().toISOString(),
              });
            }}
            className="space-y-4"
          >
            <input name="name" type="text" placeholder="Name" required className="border p-2 w-full" />
            <input name="email" type="email" placeholder="Email" className="border p-2 w-full" />
            <input name="phone" type="text" placeholder="Phone" required className="border p-2 w-full" />
            <input name="product" type="text" placeholder="Product Name" required className="border p-2 w-full" />
            <input name="quantity" type="number" placeholder="Quantity" required className="border p-2 w-full" />
            <input name="amount" type="number" placeholder="Total Amount" required className="border p-2 w-full" />
            <Button type="submit">Submit Order</Button>
          </form>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id.slice(0, 8)}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{formatPrice(order.total_amount)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateStatusMutation.mutate({ orderId: order.id, newStatus: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => sendNotification(order)}>Notify</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
