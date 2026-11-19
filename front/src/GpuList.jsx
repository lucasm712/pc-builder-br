import { useState, useEffect } from 'react';
import { API_URL } from './api.js'
function GpuList({ gpuSelecionada, onSelecionar }) { 
    const [gpus, setGpus] = useState([]); 
    useEffect(function() { 
        async function carregarGpus() { 
            try { 
                const response = await fetch(`${API_URL}/api/gpus`);
                const data = await response.json(); 
                setGpus(data);
            } 
        catch (error) {
            console.error('Erro ao carregar as GPUs:', error);
        }
    }  
    carregarGpus(); 
}, []);


function renderGpus(gpu) {
  const selecionada = gpuSelecionada?.id === gpu.id;

  return (
    <li
      key={gpu.id}
      className={selecionada ? 'selecionada' : ''}
      onClick={() => onSelecionar(gpu)}
    >
      <div className="item-card">
        <img src={gpu.imagemUrl} alt={gpu.nome} />
        <div className="item-info">
          <span className="item-nome">{gpu.nome}</span>
          <span className="item-preco">R$ {gpu.preco}</span>
        </div>
      </div>
    </li>
  );
}
   return ( 
  <ul>
  {gpus.map(renderGpus)}
   </ul> 
   ); 
}
   export default GpuList;