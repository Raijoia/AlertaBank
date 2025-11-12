import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CadastrarRelato from './pages/CadastrarRelato';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarRelato />} />
        </Routes>
      </main>
      <footer className="text-center p-4 text-cinza-escuro/50 text-sm">
        AlertaBank © 2025
      </footer>
    </div>
  );
}

export default App;