
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvoiceRequest {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderItems: Array<{
    product_name: string;
    product_price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, customerName, customerPhone, orderItems, totalAmount }: InvoiceRequest = await req.json();

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
      }).format(price);
    };

    // Generate invoice message
    let invoiceMessage = `🧾 *NOVUS FURNITURE INVOICE*\n\n`;
    invoiceMessage += `📋 Order ID: ${orderId}\n`;
    invoiceMessage += `👤 Customer: ${customerName}\n`;
    invoiceMessage += `📅 Date: ${new Date().toLocaleDateString('en-KE')}\n\n`;
    invoiceMessage += `📦 *ORDER DETAILS:*\n`;
    invoiceMessage += `─────────────────\n`;

    orderItems.forEach((item) => {
      invoiceMessage += `🪑 ${item.product_name}\n`;
      invoiceMessage += `   ${formatPrice(item.product_price)} x ${item.quantity} = ${formatPrice(item.product_price * item.quantity)}\n\n`;
    });

    invoiceMessage += `─────────────────\n`;
    invoiceMessage += `💰 *TOTAL: ${formatPrice(totalAmount)}*\n\n`;
    invoiceMessage += `📞 For any queries, contact us:\n`;
    invoiceMessage += `🏪 Novus Furniture\n`;
    invoiceMessage += `📱 +254708921377\n\n`;
    invoiceMessage += `Thank you for choosing Novus Furniture! 🙏`;

    // Create WhatsApp URL
    const whatsappPhone = customerPhone.startsWith('+') ? customerPhone.substring(1) : customerPhone;
    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(invoiceMessage)}`;

    console.log(`Invoice generated for order ${orderId}`);
    console.log(`WhatsApp URL: ${whatsappURL}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappURL,
        message: "Invoice generated successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error generating invoice:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
