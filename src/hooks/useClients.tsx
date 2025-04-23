
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city: string;
  created_at: string;
};

export function useClients() {
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        toast.error('Erro ao carregar clientes');
        return [];
      }

      return data as Client[];
    },
  });

  const addClient = useMutation({
    mutationFn: async (client: Omit<Client, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('clients')
        .insert(client)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente adicionado com sucesso');
    },
    onError: (error) => {
      console.error('Error adding client:', error);
      toast.error('Erro ao adicionar cliente');
    },
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, ...client }: Client) => {
      const { data, error } = await supabase
        .from('clients')
        .update(client)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente atualizado com sucesso');
    },
    onError: (error) => {
      console.error('Error updating client:', error);
      toast.error('Erro ao atualizar cliente');
    },
  });

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente excluído com sucesso');
    },
    onError: (error) => {
      console.error('Error deleting client:', error);
      toast.error('Erro ao excluir cliente');
    },
  });

  return {
    clients,
    isLoading,
    addClient,
    updateClient,
    deleteClient,
  };
}
