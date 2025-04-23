
import React, { useState } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar para desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Sidebar para mobile (overlay) */}
      {showMobileSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10" 
            onClick={toggleMobileSidebar}
          />
          <Sidebar className="fixed top-0 left-0 z-20 animate-slide-in-right" />
        </>
      )}

      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar onMenuClick={toggleMobileSidebar} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
