import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function RamList({ ramsSelecionadas, onAdicionar, onRemover, placaSelecionada }) {
  const [rams, setRams] = useState([]);

  useEffect(function () {
    async function carregarRams() {
      try {
        const response = await fetch(`${API_URL}/api/rams`);
        const data = await response.json();
        setRams(data);
      } catch (error) {
        console.error('Erro ao carregar as memórias RAM:', error);
      }
    }
    carregarRams();
  }, []);

  function renderRams(ram) {
    const item = ramsSelecionadas.find(i => i.ram.id === ram.id);
    const quantidade = item ? item.quantidade : 0;

    return (
      <li key={ram.id} className={quantidade > 0 ? 'selecionada' : ''}>
        <div className="item-card">
          <img src={ram.imagemUrl} alt={ram.nome} />
          <div className="item-info">
            <span className="item-nome">{ram.nome}</span>
            <span className="item-detalhes">
              {ram.tipo} · {ram.tamanho}GB · {ram.pentes}x
            </span>
            <span className="item-preco">R$ {ram.preco}</span>
            <div className="item-quantidade">
              <button onClick={() => onRemover(ram)} disabled={quantidade === 0}>-</button>
              <span>{quantidade}</span>
              <button onClick={() => onAdicionar(ram)}>+</button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{rams.map(renderRams)}</ul>;
}

export default RamList;