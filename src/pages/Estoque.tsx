
import React, { useState, useEffect } from 'react';
import { TabelaBase } from '@/components/TablaBase';
import { Search } from 'lucide-react';

// Tipos
type TipoAnimal = 'Cães' | 'Gatos' | 'Aves' | 'Peixes' | 'Equinos' | 'Bovinos' | 'Todos';

type Produto = {
  id: number;
  nome: string;
  tipo: string;
  quantidade: number;
  precoUnitario: string;
  status: 'Disponível' | 'Baixo' | 'Esgotado';
};

const Estoque = () => {
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<TipoAnimal>('Todos');
  const [busca, setBusca] = useState('');
  
  // Dados simulados de produtos
  const todosProdutos: Produto[] = [
    { 
      id: 1, 
      nome: 'Ração Premium Cães Adultos', 
      tipo: 'Cães', 
      quantidade: 127, 
      precoUnitario: 'R$ 145,90', 
      status: 'Disponível' 
    },
    { 
      id: 2, 
      nome: 'Ração Gatos Castrados', 
      tipo: 'Gatos', 
      quantidade: 92, 
      precoUnitario: 'R$ 126,50', 
      status: 'Disponível' 
    },
    { 
      id: 3, 
      nome: 'Ração para Peixes Tropicais', 
      tipo: 'Peixes', 
      quantidade: 45, 
      precoUnitario: 'R$ 18,90', 
      status: 'Disponível' 
    },
    { 
      id: 4, 
      nome: 'Alpiste para Canários', 
      tipo: 'Aves', 
      quantidade: 62, 
      precoUnitario: 'R$ 22,50', 
      status: 'Disponível' 
    },
    { 
      id: 5, 
      nome: 'Ração Equina Performance', 
      tipo: 'Equinos', 
      quantidade: 8, 
      precoUnitario: 'R$ 89,90', 
      status: 'Baixo' 
    },
    { 
      id: 6, 
      nome: 'Suplemento Bovino Premium', 
      tipo: 'Bovinos', 
      quantidade: 37, 
      precoUnitario: 'R$ 198,50', 
      status: 'Disponível' 
    },
    { 
      id: 7, 
      nome: 'Ração Filhotes Golden', 
      tipo: 'Cães', 
      quantidade: 0, 
      precoUnitario: 'R$ 178,90', 
      status: 'Esgotado' 
    },
    { 
      id: 8, 
      nome: 'Ração Úmida Gatos Exigentes', 
      tipo: 'Gatos', 
      quantidade: 5, 
      precoUnitario: 'R$ 12,90', 
      status: 'Baixo' 
    },
    { 
      id: 9, 
      nome: 'Ração para Frangos de Corte', 
      tipo: 'Aves', 
      quantidade: 25, 
      precoUnitario: 'R$ 65,90', 
      status: 'Disponível' 
    },
  ];

  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      aplicarFiltros();
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros quando mudar filtroTipo ou busca
  useEffect(() => {
    aplicarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroTipo, busca]);

  const aplicarFiltros = () => {
    let resultado = [...todosProdutos];
    
    // Filtrar por tipo de animal
    if (filtroTipo !== 'Todos') {
      resultado = resultado.filter(produto => produto.tipo === filtroTipo);
    }
    
    // Filtrar por busca
    if (busca.trim() !== '') {
      const termoBusca = busca.toLowerCase();
      resultado = resultado.filter(produto => 
        produto.nome.toLowerCase().includes(termoBusca) || 
        produto.tipo.toLowerCase().includes(termoBusca)
      );
    }
    
    setProdutosFiltrados(resultado);
  };

  const colunas = [
    {
      header: 'Produto',
      accessorKey: 'nome',
    },
    {
      header: 'Tipo',
      accessorKey: 'tipo',
    },
    {
      header: 'Quantidade',
      accessorKey: 'quantidade',
    },
    {
      header: 'Preço Unit.',
      accessorKey: 'precoUnitario',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: { status: string }) => {
        const getStatusStyle = () => {
          switch (info.status) {
            case 'Disponível':
              return 'bg-green-100 text-green-800';
            case 'Baixo':
              return 'bg-amber-100 text-amber-800';
            case 'Esgotado':
              return 'bg-red-100 text-red-800';
            default:
              return 'bg-gray-100 text-gray-800';
          }
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}>
            {info.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Controle de Estoque</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary w-full"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as TipoAnimal)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="Todos">Todos</option>
            <option value="Cães">Cães</option>
            <option value="Gatos">Gatos</option>
            <option value="Aves">Aves</option>
            <option value="Peixes">Peixes</option>
            <option value="Equinos">Equinos</option>
            <option value="Bovinos">Bovinos</option>
          </select>
        </div>
      </div>
      
      <div className="card-dashboard overflow-hidden">
        <TabelaBase
          columns={colunas}
          data={produtosFiltrados}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Estoque;
