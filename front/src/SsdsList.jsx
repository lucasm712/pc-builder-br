import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function SsdsList({ ssdsSelecionados, onAdicionar, onRemover, placaSelecionada }) {
  const [ssds, setSsds] = useState([]);

  useEffect(function () {
    async function carregarSsds() {
      try {
        const response = await fetch(`${API_URL}/api/ssds`);
        const data = await response.json();
        setSsds(data);
      } catch (error) {
        console.error('Erro ao carregar os SSDs:', error);
      }
    }
    carregarSsds();
  }, []);

  function formatarTamanho(tamanho) {
    if (tamanho >= 1000) {
      return `${tamanho / 1000}TB`;
    }
    return `${tamanho}GB`;
  }

  function renderSsds(ssd) {
    const item = ssdsSelecionados.find(i => i.ssds.id === ssd.id);
    const quantidade = item ? item.quantidade : 0;

    return (
      <li key={ssd.id} className={quantidade > 0 ? 'selecionada' : ''}>
        <div className="item-card">
          <img src={ssd.imagemUrl} alt={ssd.nome} />
          <div className="item-info">
            <span className="item-nome">{ssd.nome}</span>
            <span className="item-detalhes">
              {ssd.tipoSsd} · {formatarTamanho(ssd.tamanho)}
            </span>
            <span className="item-preco">R$ {ssd.preco}</span>
            <div className="item-quantidade">
              <button onClick={() => onRemover(ssd)} disabled={quantidade === 0}>-</button>
              <span>{quantidade}</span>
              <button onClick={() => onAdicionar(ssd)}>+</button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{ssds.map(renderSsds)}</ul>;
}

export default SsdsList;