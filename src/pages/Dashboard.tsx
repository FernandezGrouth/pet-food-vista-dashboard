
import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, CheckSquare } from 'lucide-react';
import { CardResumo } from '@/components/ui/CardResumo';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Dados simulados para os gráficos
  const vendasData = [
    { nome: 'Jan', valor: 12400 },
    { nome: 'Fev', valor: 14000 },
    { nome: 'Mar', valor: 15600 },
    { nome: 'Abr', valor: 13200 },
    { nome: 'Mai', valor: 18000 },
    { nome: 'Jun', valor: 19200 },
  ];

  const tiposProdutosData = [
    { nome: 'Cães', valor: 45 },
    { nome: 'Gatos', valor: 30 },
    { nome: 'Peixes', valor: 12 },
    { nome: 'Aves', valor: 18 },
    { nome: 'Equinos', valor: 25 },
    { nome: 'Bovinos', valor: 40 },
  ];

  const pedidosRecentes = [
    { cliente: 'Pet Shop Amigo Fiel', total: 'R$ 3.450,00', data: '23/04/2025' },
    { cliente: 'Fazenda Campo Verde', total: 'R$ 12.780,00', data: '22/04/2025' },
    { cliente: 'Agropecuária Central', total: 'R$ 7.350,00', data: '21/04/2025' },
  ];

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="hoje">Últimos 30 dias</option>
          <option value="semana">Últimos 3 meses</option>
          <option value="mes">Último ano</option>
        </select>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardResumo 
          titulo="Total de Produtos" 
          valor="248" 
          icone={<Package size={20} />} 
          variacao={{ valor: 12, positiva: true }}
          loading={loading}
        />
        <CardResumo 
          titulo="Itens em Estoque" 
          valor="1.842" 
          icone={<ShoppingCart size={20} />} 
          variacao={{ valor: 5, positiva: true }}
          loading={loading}
        />
        <CardResumo 
          titulo="Pedidos Entregues" 
          valor="125" 
          icone={<CheckSquare size={20} />} 
          variacao={{ valor: 3, positiva: false }}
          loading={loading}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-dashboard">
          <h2 className="text-lg font-medium mb-4">Vendas Mensais</h2>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-full space-y-4">
                <SkeletonLoader className="h-48" />
              </div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vendasData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3F7D58" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3F7D58" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="nome" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$ ${value}`} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                  <Area type="monotone" dataKey="valor" stroke="#3F7D58" fillOpacity={1} fill="url(#colorVendas)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card-dashboard">
          <h2 className="text-lg font-medium mb-4">Produtos por Categoria</h2>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-full space-y-4">
                <SkeletonLoader className="h-48" />
              </div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tiposProdutosData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="nome" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value} produtos`, 'Quantidade']} />
                  <Bar dataKey="valor" fill="#EF9651" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Pedidos Recentes */}
      <div className="card-dashboard">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Pedidos Recentes</h2>
          <button className="text-primary hover:underline text-sm">Ver todos</button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <SkeletonLoader count={3} className="h-12" />
          </div>
        ) : (
          <div className="divide-y divide-muted">
            {pedidosRecentes.map((pedido, index) => (
              <div key={index} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="font-medium">{pedido.cliente}</p>
                  <p className="text-sm text-gray-500">{pedido.data}</p>
                </div>
                <p className="text-secondary-dark font-medium mt-2 sm:mt-0">{pedido.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
