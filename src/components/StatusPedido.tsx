
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'entregue' | 'em rota' | 'pendente' | 'cancelado';

interface StatusPedidoProps {
  status: StatusType;
  className?: string;
}

export const StatusPedido: React.FC<StatusPedidoProps> = ({ status, className }) => {
  const statusConfig = {
    entregue: {
      label: 'Entregue',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      dotColor: 'bg-green-600',
    },
    'em rota': {
      label: 'Em Rota',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      dotColor: 'bg-blue-600',
    },
    pendente: {
      label: 'Pendente',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-800',
      dotColor: 'bg-amber-600',
    },
    cancelado: {
      label: 'Cancelado',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      dotColor: 'bg-red-600',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "px-3 py-1 rounded-full inline-flex items-center gap-1.5 text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)} />
      {config.label}
    </div>
  );
};
