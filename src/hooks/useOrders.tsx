
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Product } from './useProducts';
import { Client } from './useClients';

export type OrderItem = {
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
};

export type Order = {
  id: string;
  client_id: string;
  status: 'pendente' | 'em rota' | 'entregue';
  items: OrderItem[];
  total: number;
  order_date: string;
  created_at: string;
  client?: Client;
};

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, client:clients(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast.error('Erro ao carregar pedidos');
        return [];
      }

      return data as Order[];
    },
  });

  const addOrder = useMutation({
    mutationFn: async (order: Omit<Order, 'id' | 'created_at' | 'order_date' | 'client'>) => {
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido adicionado com sucesso');
    },
    onError: (error) => {
      console.error('Error adding order:', error);
      toast.error('Erro ao adicionar pedido');
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Status do pedido atualizado com sucesso');
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast.error('Erro ao atualizar status do pedido');
    },
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido excluído com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting order:', error);
      toast.error('Erro ao excluir pedido');
    },
  });

  return {
    orders,
    isLoading,
    addOrder,
    updateOrderStatus,
    deleteOrder,
  };
}
