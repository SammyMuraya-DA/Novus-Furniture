
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

  // Fetch orders from Supabase
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

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: (_, { orderId, newStatus }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      
      const order = orders.find(o => o.id === orderId);
      if (order && newStatus === "processing") {
        sendNotification(order);
      }

      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}`,
      });
    },
  });

  const sendNotification = (order: Order) => {
    const message = `Hello ${order.customer_name}, your order #${order.id} is now being processed. We'll keep you updated on the progress. Thank you for choosing Novus Furniture!`;
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${order.customer_phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Notification Sent",
      description: `WhatsApp notification sent to ${order.customer_name}`,
    });
  };

  const resendInvoice = async (order: Order) => {
    try {
      await supabase.functions.invoke('send-invoice', {
        body: {
          orderId: order.id,
          customerName: order.customer_name,
          customerPhone: order.customer_phone,
          orderItems: order.order_items,
          totalAmount: order.total_amount,
        },
      });

      toast({
        title: "Invoice Resent",
        description: "Invoice has been sent to customer's WhatsApp",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend invoice",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
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
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "processing").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(orders.filter(o => o.status === "completed").reduce((sum, order) => sum + order.total_amount, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer_name}</div>
                      {order.customer_email && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.customer_email}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order.customer_phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.order_items?.map((item: any, index: number) => (
                        <div key={index}>
                          {item.product_name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(order.total_amount)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Select
                        value={order.status}
                        onValueChange={(value: string) => updateStatusMutation.mutate({ orderId: order.id, newStatus: value })}
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resendInvoice(order)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Invoice
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendNotification(order)}
                      >
                        Notify
                      </Button>
                    </div>
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
