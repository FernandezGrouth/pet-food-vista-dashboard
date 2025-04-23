
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail } from 'lucide-react';

type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  ultimoPedido: string;
  totalCompras: string;
  tipo: 'Pet Shop' | 'Fazenda' | 'Agropecuária' | 'Clínica Veterinária' | 'Aviário';
};

const Clientes = () => {
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  // Dados simulados
  const todosClientes: Cliente[] = [
    {
      id: 1,
      nome: 'Pet Shop Amigo Fiel',
      email: 'contato@amigofiel.com',
      telefone: '(11) 98765-4321',
      cidade: 'São Paulo, SP',
      ultimoPedido: '23/04/2025',
      totalCompras: 'R$ 48.750,00',
      tipo: 'Pet Shop'
    },
    {
      id: 2,
      nome: 'Fazenda Campo Verde',
      email: 'compras@campoverde.com',
      telefone: '(16) 3721-8900',
      cidade: 'Ribeirão Preto, SP',
      ultimoPedido: '22/04/2025',
      totalCompras: 'R$ 127.890,00',
      tipo: 'Fazenda'
    },
    {
      id: 3,
      nome: 'Agropecuária Central',
      email: 'contato@agrocentral.com',
      telefone: '(17) 3635-7788',
      cidade: 'São José do Rio Preto, SP',
      ultimoPedido: '21/04/2025',
      totalCompras: 'R$ 89.420,00',
      tipo: 'Agropecuária'
    },
    {
      id: 4,
      nome: 'Pet Shop Patinhas',
      email: 'vendas@patinhas.com',
      telefone: '(13) 3222-5566',
      cidade: 'Santos, SP',
      ultimoPedido: '20/04/2025',
      totalCompras: 'R$ 36.780,00',
      tipo: 'Pet Shop'
    },
    {
      id: 5,
      nome: 'Centro Equestre Rio Claro',
      email: 'compras@centroequestre.com',
      telefone: '(19) 3522-7733',
      cidade: 'Rio Claro, SP',
      ultimoPedido: '19/04/2025',
      totalCompras: 'R$ 155.450,00',
      tipo: 'Fazenda'
    },
    {
      id: 6,
      nome: 'Clínica Veterinária Saúde Animal',
      email: 'atendimento@saudeanimal.com',
      telefone: '(11) 3456-7890',
      cidade: 'Campinas, SP',
      ultimoPedido: '17/04/2025',
      totalCompras: 'R$ 22.350,00',
      tipo: 'Clínica Veterinária'
    },
    {
      id: 7,
      nome: 'Aviário São Francisco',
      email: 'contato@aviariosf.com',
      telefone: '(14) 3677-5544',
      cidade: 'Bauru, SP',
      ultimoPedido: '16/04/2025',
      totalCompras: 'R$ 43.790,00',
      tipo: 'Aviário'
    },
    {
      id: 8,
      nome: 'Pet Shop Mundo Animal',
      email: 'vendas@mundoanimal.com',
      telefone: '(12) 3966-4321',
      cidade: 'São José dos Campos, SP',
      ultimoPedido: '15/04/2025',
      totalCompras: 'R$ 29.450,00',
      tipo: 'Pet Shop'
    },
  ];

  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      aplicarFiltros();
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros quando mudar busca ou filtroTipo
  useEffect(() => {
    aplicarFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca, filtroTipo]);

  const aplicarFiltros = () => {
    let resultado = [...todosClientes];
    
    // Filtrar por tipo
    if (filtroTipo !== 'todos') {
      resultado = resultado.filter(cliente => cliente.tipo === filtroTipo);
    }
    
    // Filtrar por busca
    if (busca.trim() !== '') {
      const termoBusca = busca.toLowerCase();
      resultado = resultado.filter(cliente => 
        cliente.nome.toLowerCase().includes(termoBusca) || 
        cliente.cidade.toLowerCase().includes(termoBusca) || 
        cliente.email.toLowerCase().includes(termoBusca)
      );
    }
    
    setClientesFiltrados(resultado);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
      
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="todos">Todos os tipos</option>
          <option value="Pet Shop">Pet Shop</option>
          <option value="Fazenda">Fazenda</option>
          <option value="Agropecuária">Agropecuária</option>
          <option value="Clínica Veterinária">Clínica Veterinária</option>
          <option value="Aviário">Aviário</option>
        </select>
      </div>
      
      {/* Cards de clientes */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card-dashboard h-48 animate-pulse">
              <div className="skeleton h-5 w-3/4 mb-4"></div>
              <div className="skeleton h-4 w-1/2 mb-2"></div>
              <div className="skeleton h-4 w-2/3 mb-2"></div>
              <div className="skeleton h-4 w-1/3 mb-4"></div>
              <div className="skeleton h-10 w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {clientesFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clientesFiltrados.map((cliente) => (
                <div key={cliente.id} className="card-dashboard card-hover">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg">{cliente.nome}</h3>
                    <span className="text-xs px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-lg">
                      {cliente.tipo}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{cliente.cidade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{cliente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span className="text-primary hover:underline cursor-pointer">{cliente.email}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Último pedido</p>
                        <p className="font-medium">{cliente.ultimoPedido}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Total em compras</p>
                        <p className="font-medium text-secondary-dark">{cliente.totalCompras}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-dashboard text-center py-10">
              <p className="text-gray-500">Nenhum cliente encontrado com os filtros atuais.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Clientes;
