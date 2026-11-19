import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function PsuList({ psusSelecionada, onSelecionar }) {
  const [psus, setPsus] = useState([]);

  useEffect(function () {
    async function carregarPsus() {
      try {
        const response = await fetch(`${API_URL}/api/psus`);
        const data = await response.json();
        setPsus(data);
      } catch (error) {
        console.error('Erro ao carregar fontes:', error);
      }
    }
    carregarPsus();
  }, []);

  function renderPsus(psu) {
    const selecionada = psusSelecionada?.id === psu.id;

    return (
      <li
        key={psu.id}
        className={selecionada ? 'selecionada' : ''}
        onClick={() => onSelecionar(psu)}
      >
        <div className="item-card">
          <img src={psu.imagemUrl} alt={psu.nome} />
          <div className="item-info">
            <span className="item-nome">{psu.nome}</span>
            <span className="item-preco">R$ {psu.preco}</span>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{psus.map(renderPsus)}</ul>;
}

export default PsuList;