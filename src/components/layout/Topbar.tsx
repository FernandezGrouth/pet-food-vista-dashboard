
import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

type TopbarProps = {
  onMenuClick: () => void;
  className?: string;
};

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick, className }) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={cn("bg-white h-16 flex items-center justify-between px-4 shadow-sm", className)}>
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="mr-4 p-2 rounded-full hover:bg-muted transition-colors md:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-medium text-primary hidden md:block">Distribuidora PetNutri</h1>
        <h1 className="text-lg font-medium text-primary md:hidden">PetNutri</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <button 
            onClick={toggleNotifications} 
            className="p-2 rounded-full hover:bg-muted transition-colors relative"
            aria-label="Notificações"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-2xl shadow-lg p-3 z-50 border border-muted animate-scale-in">
              <h3 className="font-medium mb-2 text-primary">Notificações</h3>
              <div className="divide-y divide-muted">
                <div className="py-2">
                  <p className="text-sm font-medium">Novo pedido recebido</p>
                  <p className="text-xs text-gray-500">Fazenda Campo Verde - há 10 minutos</p>
                </div>
                <div className="py-2">
                  <p className="text-sm font-medium">Estoque baixo: Ração Equina Premium</p>
                  <p className="text-xs text-gray-500">Menos de 5 unidades - há 1 hora</p>
                </div>
                <div className="py-2">
                  <p className="text-sm font-medium">Entrega concluída</p>
                  <p className="text-xs text-gray-500">Pet Shop Amigo Fiel - há 3 horas</p>
                </div>
              </div>
              <button className="w-full mt-2 text-xs text-center text-primary py-1 hover:underline">
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
      </div>
    </div>
  );
};
