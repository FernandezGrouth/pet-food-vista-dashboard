
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  category: 'pet' | 'cavalo' | 'vaca' | 'galinha';
  brand: string;
  stock: number;
  price: number;
  created_at: string;
};

export function useProducts() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Erro ao carregar produtos');
        return [];
      }

      return data as Product[];
    },
  });

  const addProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto adicionado com sucesso');
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast.error('Erro ao adicionar produto');
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto atualizado com sucesso');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Erro ao atualizar produto');
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto excluído com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Erro ao excluir produto');
    },
  });

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
