import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function MotherboardList({ placaSelecionada, onSelecionar }) {
  const [motherboards, setMotherboards] = useState([]);

  useEffect(function () {
    async function carregarPlacas() {
      try {
        const response = await fetch(`${API_URL}/api/motherboards`);
        const data = await response.json();
        setMotherboards(data);
      } catch (error) {
        console.error('Erro ao carregar as placas-mãe:', error);
      }
    }
    carregarPlacas();
  }, []);

  function renderMotherboards(motherboard) {
    const selecionada = placaSelecionada?.id === motherboard.id;

    return (
      <li
        key={motherboard.id}
        className={selecionada ? 'selecionada' : ''}
        onClick={() => onSelecionar(motherboard)}
      >
        <div className="item-card">
          <img src={motherboard.imagemUrl} alt={motherboard.nome} />
          <div className="item-info">
            <span className="item-nome">{motherboard.nome}</span>
            <span className="item-preco">R$ {motherboard.preco}</span>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{motherboards.map(renderMotherboards)}</ul>;
}

export default MotherboardList;