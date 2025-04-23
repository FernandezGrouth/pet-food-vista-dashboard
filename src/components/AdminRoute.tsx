
import { Navigate } from 'react-router-dom';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { SkeletonLoader } from './ui/SkeletonLoader';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAdminCheck();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonLoader count={3} className="w-32" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
