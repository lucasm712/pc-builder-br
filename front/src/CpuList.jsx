import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function CpuList({ cpuSelecionada, onSelecionar }) {
  const [cpus, setCpus] = useState([]);

  useEffect(function () {
    async function carregarCpus() {
      try {
        const response = await fetch(`${API_URL}/api/cpus`);
        const data = await response.json();
        setCpus(data);
      } catch (error) {
        console.error('Erro ao carregar os processadores:', error);
      }
    }
    carregarCpus();
  }, []);

  function renderCpus(cpu) {
    const selecionada = cpuSelecionada?.id === cpu.id;

    return (
      <li
        key={cpu.id}
        className={selecionada ? 'selecionada' : ''}
        onClick={() => onSelecionar(cpu)}
      >
        <div className="item-card">
          <img src={cpu.imagemUrl} alt={cpu.nome} />
          <div className="item-info">
            <span className="item-nome">{cpu.nome}</span>
            <span className="item-preco">R$ {cpu.preco}</span>
          </div>
        </div>
      </li>
    );
  }

  return <ul>{cpus.map(renderCpus)}</ul>;
}

export default CpuList;