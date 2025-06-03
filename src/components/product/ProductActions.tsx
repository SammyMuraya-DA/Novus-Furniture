
import { Button } from "@/components/ui/button";
import { Phone, Mail, Share2, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductActionsProps {
  productName: string;
  productDescription: string;
  inStock: boolean;
}

const ProductActions = ({ productName, productDescription, inStock }: ProductActionsProps) => {
  const { toast } = useToast();

  const handleWhatsAppContact = () => {
    const message = `Hi, I'm interested in the ${productName}. Could you provide more information?`;
    window.open(`https://wa.me/254708921377?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailContact = () => {
    const subject = `Inquiry about ${productName}`;
    const body = `Hi,\n\nI'm interested in the ${productName} and would like more information.\n\nThank you!`;
    window.open(`mailto:info@modernspace.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: productDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={handleWhatsAppContact}
          disabled={!inStock}
        >
          <Phone className="mr-2 h-5 w-5" />
          WhatsApp Inquiry
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleEmailContact}
        >
          <Mail className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Truck className="h-6 w-6 text-amber-600" />
          <div>
            <p className="font-medium text-gray-900">Free Delivery</p>
            <p className="text-sm text-gray-600">Within Nairobi</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Shield className="h-6 w-6 text-amber-600" />
          <div>
            <p className="font-medium text-gray-900">5-Year Warranty</p>
            <p className="text-sm text-gray-600">Full coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
