
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard size={22} />, 
      path: '/' 
    },
    { 
      name: 'Estoque', 
      icon: <Package size={22} />, 
      path: '/estoque' 
    },
    { 
      name: 'Pedidos', 
      icon: <ShoppingCart size={22} />, 
      path: '/pedidos' 
    },
    { 
      name: 'Clientes', 
      icon: <Users size={22} />, 
      path: '/clientes' 
    }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full min-h-screen bg-primary text-white transition-all duration-300',
        collapsed ? 'w-[70px]' : 'w-[250px]',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-primary-light">
        <div className={cn("flex items-center overflow-hidden", collapsed ? 'justify-center w-full' : '')}>
          {!collapsed && (
            <h1 className="font-bold text-lg animate-fade-in">PetNutri</h1>
          )}
          {collapsed && <span className="text-xl font-bold">P</span>}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-primary-light transition-colors"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 py-4">
        <nav>
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center py-3 px-3 rounded-lg transition-all',
                      isActive
                        ? 'bg-white bg-opacity-20 font-medium'
                        : 'hover:bg-white hover:bg-opacity-10',
                      collapsed ? 'justify-center' : 'space-x-3'
                    )}
                  >
                    <span className="text-white">{item.icon}</span>
                    {!collapsed && <span className="transition-all">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-primary-light">
        <div className="flex items-center justify-center bg-accent bg-opacity-20 rounded-lg p-2">
          <span className="text-xs text-center">
            {!collapsed 
              ? "⚠️ Login será adicionado posteriormente via Supabase com controle de acesso para usuários e administradores." 
              : "⚠️"}
          </span>
        </div>
      </div>
    </div>
  );
};
