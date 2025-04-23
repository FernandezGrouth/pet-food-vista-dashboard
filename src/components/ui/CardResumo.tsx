
import React from 'react';
import { cn } from '@/lib/utils';

type CardResumoProps = {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
  variacao?: {
    valor: number;
    positiva: boolean;
  };
  loading?: boolean;
  className?: string;
};

export const CardResumo: React.FC<CardResumoProps> = ({
  titulo,
  valor,
  icone,
  variacao,
  loading = false,
  className,
}) => {
  return (
    <div className={cn(
      "card-dashboard card-hover flex flex-col animate-fade-in",
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {loading ? (
            <div className="skeleton w-1/2 h-5 mb-2"></div>
          ) : (
            <h3 className="text-gray-500 text-sm font-medium">{titulo}</h3>
          )}
        </div>
        <div className="p-2 rounded-lg bg-primary bg-opacity-10 text-primary">
          {icone}
        </div>
      </div>

      {loading ? (
        <div className="skeleton w-3/4 h-8 mb-2"></div>
      ) : (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{valor}</h2>
      )}

      {variacao && !loading && (
        <div className="flex items-center text-sm">
          <span
            className={cn(
              "flex items-center",
              variacao.positiva ? 'text-green-600' : 'text-red-500'
            )}
          >
            <span className={cn(
              "inline-block mr-1",
              variacao.positiva ? 'transform rotate-0' : 'transform rotate-180'
            )}>
              ▲
            </span>
            {variacao.valor}%
          </span>
          <span className="text-gray-400 ml-2 text-xs">vs último mês</span>
        </div>
      )}

      {loading && (
        <div className="skeleton w-1/3 h-4"></div>
      )}
    </div>
  );
};
