
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center max-w-lg p-8 bg-white rounded-2xl shadow-card animate-fade-in">
        <h1 className="text-7xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Ops! Página não encontrada</p>
        <p className="text-gray-500 mb-8">
          A página que você está procurando foi movida, excluída ou talvez nunca tenha existido.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
