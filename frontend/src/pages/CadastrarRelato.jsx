import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBancos, postRelato } from '../services/api';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export default function CadastrarRelato() {
  const [bancos, setBancos] = useState([]);
  const [bancoId, setBancoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();

  // Busca os bancos para o <select>
  useEffect(() => {
    getBancos()
      .then(res => setBancos(res.data))
      .catch(err => setError('Não foi possível carregar a lista de bancos.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bancoId || !descricao) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (!captchaToken) {
      setError('Por favor, confirme que você não é um robô.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const relatoData = { bancoId, descricao };
      await postRelato(relatoData);
      
      setSuccess('Relato cadastrado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError('Erro ao enviar o relato. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-branco-limpo p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold font-montserrat text-azul-confianca mb-6">
        Cadastrar Novo Relato de Fraude
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="banco" className="block text-sm font-medium font-montserrat text-cinza-escuro mb-1">
            Qual banco está relacionado à tentativa de golpe?
          </label>
          <select
            id="banco"
            value={bancoId}
            onChange={(e) => setBancoId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-azul-claro focus:border-azul-claro"
            disabled={bancos.length === 0}
          >
            <option value="">{bancos.length > 0 ? 'Selecione um banco...' : 'Carregando bancos...'}</option>
            {bancos.map(banco => (
              <option key={banco.id} value={banco.id}>{banco.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium font-montserrat text-cinza-escuro mb-1">
            Descreva o que aconteceu (seja breve):
          </label>
          <textarea
            id="descricao"
            rows="5"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-azul-claro focus:border-azul-claro"
            placeholder="Ex: Recebi um SMS do número X dizendo que minha conta foi bloqueada e pedindo para eu clicar em um link..."
          />
        </div>

        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        {error && (
          <div className="bg-amarelo-alerta/30 text-cinza-escuro p-3 rounded-md text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md text-center font-medium">
            {success}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link
            to="/"
            className="w-full md:w-auto text-center py-3 px-6 text-azul-confianca font-bold rounded-md hover:bg-gray-100 transition-all"
          >
            Voltar para Home
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-azul-confianca hover:bg-azul-claro text-branco-limpo font-montserrat font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg disabled:bg-gray-400"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Relato'}
          </button>
        </div>
      </form>
    </div>
  );
}