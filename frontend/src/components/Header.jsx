import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-azul-confianca text-branco-limpo p-4 shadow-lg">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center md:relative py-3 px-6 mt-10 md:mt-0 md:ml-auto">
        <Link
          to="/"
          className="text-2xl font-montserrat font-bold md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
        >
          AlertaBank
        </Link>
      </nav>
    </header>
  );
}
