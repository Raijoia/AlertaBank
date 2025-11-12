import React, { useState, useEffect } from 'react';
import { getBancos, getRelatos } from '../services/api';
import RelatosChart from '../components/RelatosChart';
import { Link } from 'react-router-dom';

export default function Home() {
  const [bancos, setBancos] = useState([]);
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [bancosRes, relatosRes] = await Promise.all([getBancos(), getRelatos()]);
        
        setBancos(bancosRes.data);
        setRelatos(relatosRes.data);
        
        // Processar dados para o gráfico
        processChartData(bancosRes.data, relatosRes.data);
        
      } catch (err) {
        setError('Falha ao carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function processChartData(bancosList, relatosList) {
    const contagemRelatos = {};
    
    bancosList.forEach(banco => {
      contagemRelatos[banco.id] = { nome: banco.nome, contagem: 0 };
    });

    // Conta os relatos
    relatosList.forEach(relato => {
      if (contagemRelatos[relato.bancoId]) {
        contagemRelatos[relato.bancoId].contagem++;
      }
    });
    
    const sortedData = Object.values(contagemRelatos)
                             .sort((a, b) => b.contagem - a.contagem);

    setChartData({
      labels: sortedData.map(d => d.nome),
      datasets: [
        {
          label: 'Número de Relatos de Fraude',
          data: sortedData.map(d => d.contagem),
          backgroundColor: '#0B4C8C', 
          borderColor: '#2E86DE',
          borderWidth: 1,
        },
      ],
    });
  }

  if (loading) {
    return <div className="text-center font-montserrat">Carregando dados...</div>;
  }

  if (error) {
    return <div className="bg-amarelo-alerta/20 text-cinza-escuro p-4 rounded text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-branco-limpo p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-azul-confianca mb-4">
          Ranking de Bancos por Relatos de Fraude
        </h1>
        <p className="font-open-sans mb-6">
          Veja em tempo real quais bancos possuem mais relatos de tentativas de golpe
          reportados pela comunidade.
        </p>
        <div className="w-full h-auto md:h-[400px] relative">
          {chartData ? <RelatosChart data={chartData} /> : <p>Processando gráfico...</p>}
        </div>
      </section>

      <section className="text-center">
        <Link
          to="/cadastrar"
          className="bg-azul-confianca hover:bg-azul-claro text-branco-limpo font-montserrat font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
        >
          Reportar uma Fraude Agora
        </Link>
      </section>
    </div>
  );
}