
import React from 'react';
import { cn } from '@/lib/utils';
import { SkeletonLoader } from './ui/SkeletonLoader';

interface Column {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
}

interface TableBaseProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  skeletonRows?: number;
  className?: string;
}

export const TabelaBase: React.FC<TableBaseProps> = ({
  columns,
  data,
  isLoading = false,
  skeletonRows = 5,
  className,
}) => {
  return (
    <div className={cn("w-full overflow-auto rounded-2xl", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted text-left">
            {columns.map((column, index) => (
              <th
                key={column.accessorKey || index}
                className="px-4 py-3 text-sm font-medium text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array(skeletonRows)
              .fill(0)
              .map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} className="border-b border-muted">
                  {columns.map((_, columnIndex) => (
                    <td key={`skeleton-${rowIndex}-${columnIndex}`} className="px-4 py-4">
                      <SkeletonLoader />
                    </td>
                  ))}
                </tr>
              ))
          ) : data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="bg-white border-b border-muted hover:bg-muted-light transition-colors"
              >
                {columns.map((column, columnIndex) => (
                  <td key={`cell-${rowIndex}-${columnIndex}`} className="px-4 py-4 text-sm">
                    {column.cell ? column.cell(row) : row[column.accessorKey]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                Nenhum dado encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
