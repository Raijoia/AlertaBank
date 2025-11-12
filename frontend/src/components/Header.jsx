import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-azul-confianca text-branco-limpo p-4 shadow-lg">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-montserrat font-bold">
          AlertaBank
        </Link>
        <div className="mt-4 md:mt-0">
          <Link
            to="/cadastrar"
            className="bg-azul-claro hover:bg-opacity-80 text-branco-limpo font-montserrat font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Cadastrar Relato
          </Link>
        </div>
      </nav>
    </header>
  );
}