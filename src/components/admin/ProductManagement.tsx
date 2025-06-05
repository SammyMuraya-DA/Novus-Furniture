import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
}

const ProductManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Fetch products from Supabase
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data;
    },
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (productData: Partial<Product>) => {
      const { error } = await supabase.from('products').insert([productData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Product Added", description: "New product added successfully!" });
      setIsAddingNew(false);
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (productData: Product) => {
      const { error } = await supabase.from('products').update(productData).eq('id', productData.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'], queryKey: ['homepage-products'] }); // Refresh both views
      toast({ title: "Product Updated", description: "Changes reflected on homepage!" });
      setEditingProduct(null);
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'], queryKey: ['homepage-products'] });
      toast({ title: "Product Deleted", description: "Removed successfully!" });
    },
  });

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={() => setIsAddingNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {isAddingNew || editingProduct ? (
        <ProductForm product={editingProduct} onSave={editingProduct ? updateProductMutation.mutate : addProductMutation.mutate} onCancel={() => { setIsAddingNew(false); setEditingProduct(null); }} />
      ) : (
        <ProductTable products={products} onEdit={setEditingProduct} onDelete={deleteProductMutation.mutate} />
      )}
    </div>
  );
};

export default ProductManagement;
