
import React, { useState, useEffect } from 'react';
import { TabelaBase } from '@/components/TablaBase';
import { StatusPedido } from '@/components/StatusPedido';

type Pedido = {
  id: string;
  cliente: string;
  data: string;
  valor: string;
  status: 'entregue' | 'em rota' | 'pendente' | 'cancelado';
  itens: number;
};

const Pedidos = () => {
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  
  // Dados simulados
  const todosPedidos: Pedido[] = [
    {
      id: 'PED-2025042301',
      cliente: 'Pet Shop Amigo Fiel',
      data: '23/04/2025',
      valor: 'R$ 3.450,00',
      status: 'entregue',
      itens: 12
    },
    {
      id: 'PED-2025042201',
      cliente: 'Fazenda Campo Verde',
      data: '22/04/2025',
      valor: 'R$ 12.780,00',
      status: 'entregue',
      itens: 8
    },
    {
      id: 'PED-2025042101',
      cliente: 'Agropecuária Central',
      data: '21/04/2025',
      valor: 'R$ 7.350,00',
      status: 'entregue',
      itens: 15
    },
    {
      id: 'PED-2025042001',
      cliente: 'Pet Shop Patinhas',
      data: '20/04/2025',
      valor: 'R$ 2.120,00',
      status: 'em rota',
      itens: 7
    },
    {
      id: 'PED-2025041901',
      cliente: 'Centro Equestre Rio Claro',
      data: '19/04/2025',
      valor: 'R$ 8.900,00',
      status: 'em rota',
      itens: 3
    },
    {
      id: 'PED-2025041801',
      cliente: 'Fazenda Boi Feliz',
      data: '18/04/2025',
      valor: 'R$ 15.370,00',
      status: 'pendente',
      itens: 6
    },
    {
      id: 'PED-2025041701',
      cliente: 'Aviário São Francisco',
      data: '17/04/2025',
      valor: 'R$ 4.230,00',
      status: 'pendente',
      itens: 9
    },
    {
      id: 'PED-2025041601',
      cliente: 'Pet Shop Mundo Animal',
      data: '16/04/2025',
      valor: 'R$ 1.890,00',
      status: 'cancelado',
      itens: 5
    },
  ];

  const [pedidosFiltrados, setPedidosFiltrados] = useState<Pedido[]>([]);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      aplicarFiltros();
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros quando mudar filtroStatus
  useEffect(() => {
    aplicarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroStatus]);

  const aplicarFiltros = () => {
    let resultado = [...todosPedidos];
    
    if (filtroStatus !== 'todos') {
      resultado = resultado.filter(pedido => pedido.status === filtroStatus);
    }
    
    setPedidosFiltrados(resultado);
  };

  const colunas = [
    {
      header: 'Pedido',
      accessorKey: 'id',
    },
    {
      header: 'Cliente',
      accessorKey: 'cliente',
    },
    {
      header: 'Data',
      accessorKey: 'data',
    },
    {
      header: 'Itens',
      accessorKey: 'itens',
    },
    {
      header: 'Valor',
      accessorKey: 'valor',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: { status: 'entregue' | 'em rota' | 'pendente' | 'cancelado' }) => {
        return <StatusPedido status={info.status} />;
      },
    },
  ];

  // Calcular resumos
  const calcularResumos = () => {
    const total = todosPedidos.length;
    const entregues = todosPedidos.filter(p => p.status === 'entregue').length;
    const emRota = todosPedidos.filter(p => p.status === 'em rota').length;
    const pendentes = todosPedidos.filter(p => p.status === 'pendente').length;
    
    return { total, entregues, emRota, pendentes };
  };
  
  const resumos = calcularResumos();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestão de Pedidos</h1>
      
      {/* Resumo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div onClick={() => setFiltroStatus('todos')} className={`card-dashboard cursor-pointer card-hover border-l-4 ${filtroStatus === 'todos' ? 'border-primary' : 'border-transparent'}`}>
          <p className="text-sm text-gray-500">Total de Pedidos</p>
          <p className="text-xl font-bold">{loading ? '...' : resumos.total}</p>
        </div>
        <div onClick={() => setFiltroStatus('entregue')} className={`card-dashboard cursor-pointer card-hover border-l-4 ${filtroStatus === 'entregue' ? 'border-green-500' : 'border-transparent'}`}>
          <p className="text-sm text-gray-500">Entregues</p>
          <p className="text-xl font-bold">{loading ? '...' : resumos.entregues}</p>
        </div>
        <div onClick={() => setFiltroStatus('em rota')} className={`card-dashboard cursor-pointer card-hover border-l-4 ${filtroStatus === 'em rota' ? 'border-blue-500' : 'border-transparent'}`}>
          <p className="text-sm text-gray-500">Em Rota</p>
          <p className="text-xl font-bold">{loading ? '...' : resumos.emRota}</p>
        </div>
        <div onClick={() => setFiltroStatus('pendente')} className={`card-dashboard cursor-pointer card-hover border-l-4 ${filtroStatus === 'pendente' ? 'border-amber-500' : 'border-transparent'}`}>
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-xl font-bold">{loading ? '...' : resumos.pendentes}</p>
        </div>
      </div>
      
      {/* Filtro */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Lista de Pedidos</h2>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="todos">Todos os status</option>
          <option value="entregue">Entregues</option>
          <option value="em rota">Em Rota</option>
          <option value="pendente">Pendentes</option>
          <option value="cancelado">Cancelados</option>
        </select>
      </div>
      
      {/* Tabela */}
      <div className="card-dashboard overflow-hidden">
        <TabelaBase
          columns={colunas}
          data={pedidosFiltrados}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Pedidos;
