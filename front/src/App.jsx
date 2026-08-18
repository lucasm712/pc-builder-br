import './App.css';
import Header from './Header.jsx'
import Hero from './Hero.jsx' 
import Montarpc from './montarPc.jsx'
import { useState, useEffect } from 'react';
import MotherboardList from './MotherboardList.jsx'
import CpuList from './CpuList.jsx';
import GpuList from './GpuList.jsx';
import { compatibilidadeCpuMb, consumoTotal, psuSuficiente, compatibilidadeRamMb, precoTotal, ramCalculo, ramLimit, limiteSlotTotal } from './compatibilidade.js'
import RamList from './RamList.jsx'
import SsdsList from './SsdsList.jsx'
import PsuList from './PsuLimit.jsx'
import { verificarIncompatibilidades } from './compatibilidade.js';

function App() {
  const [mostrarLista, setMostrarLista] = useState(false);
  const [cpuSelecionada, setCpuSelecionada] = useState(null);
  const [etapa, setEtapa] = useState('cpu');
  const [placaSelecionada, setPlacaSelecionada] = useState(null);
  const [gpuSelecionada, setGpuSelecionada] = useState(null);
  const [ramsSelecionadas, setRamsSelecionadas] = useState([]);
  const [ssdsSelecionados, setSsdsSelecionados] = useState([]);
  const [psusSelecionada, setPsusSelecionada] = useState(null);
  const consumo = consumoTotal(cpuSelecionada, gpuSelecionada);
  const psuOk = psusSelecionada ? psuSuficiente(psusSelecionada, consumo) : false;
  


 const total = precoTotal({
  cpu: cpuSelecionada,
  motherboard: placaSelecionada,
  gpu: gpuSelecionada,
  rams: ramsSelecionadas,
  ssds: ssdsSelecionados,
  psu: psusSelecionada,
});
 
 
function baixarResumo() {
  const linhas = [
    'RESUMO DA BUILD - PC BUILDER BR',
    '================================',
    `CPU: ${cpuSelecionada?.nome}`,
    `Placa-mãe: ${placaSelecionada?.nome}`,
    `GPU: ${gpuSelecionada?.nome}`,
    ...ramsSelecionadas.map(item => `RAM (${item.quantidade}x): ${item.ram.nome}`),
    ...ssdsSelecionados.map(item => `SSD (${item.quantidade}x): ${item.ssds.nome}`),
    `Fonte: ${psusSelecionada?.nome}`,
    '--------------------------------',
    `Consumo estimado: ${consumo}W (${psuOk ? 'PSU suficiente' : 'PSU insuficiente'})`,
    `PREÇO TOTAL: R$ ${total.toFixed(2)}`,
  ];

  const conteudo = linhas.join('\n');
  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'minha-build-pc-builder-br.txt';
  link.click();

  URL.revokeObjectURL(url);
}



function acionarMontador() {
    setMostrarLista(true);
  }

  function adicionarRam(ram) {
    const limiteSlots = placaSelecionada ? placaSelecionada.slots_de_memoria : 4;
    const existente = ramsSelecionadas.find(item => item.ram.id === ram.id);

    const totalPentesAtual = ramsSelecionadas.reduce(
      (total, item) => total + item.ram.pentes * item.quantidade,
      0
    );

    if (totalPentesAtual + ram.pentes > limiteSlots) return; 

    if (existente) {
      setRamsSelecionadas(
        ramsSelecionadas.map(item =>
          item.ram.id === ram.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      );
    } else {
      setRamsSelecionadas([...ramsSelecionadas, { ram, quantidade: 1 }]);
    }
  }

  function removerRam(ram) {
    const existente = ramsSelecionadas.find(item => item.ram.id === ram.id);
    if (!existente) return;

    if (existente.quantidade > 1) {
      setRamsSelecionadas(
        ramsSelecionadas.map(item =>
          item.ram.id === ram.id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
      );
    } else {
      setRamsSelecionadas(ramsSelecionadas.filter(item => item.ram.id !== ram.id));
    }
  }

  const capacidadeTotalRam = ramsSelecionadas.reduce(
    (total, item) => total + ramCalculo(item.ram) * item.quantidade,
    0
  );

  const capacidadeOk = placaSelecionada
    ? ramLimit(placaSelecionada, capacidadeTotalRam)
    : false;

  const slotsOk = placaSelecionada
    ? limiteSlotTotal(placaSelecionada, ramsSelecionadas)
    : false;


const adicionarSsd = (ssd) => {
  const existente = ssdsSelecionados.find(item => item.ssds.id === ssd.id);

  if (existente) {
    setSsdsSelecionados(
      ssdsSelecionados.map(item =>
        item.ssds.id === ssd.id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  } else {
    setSsdsSelecionados([...ssdsSelecionados, { ssds: ssd, quantidade: 1 }]);
  }
}
const removerSsd = (ssd) => {
  const existente = ssdsSelecionados.find(item => item.ssds.id === ssd.id);
  if (!existente) return;

  if (existente.quantidade > 1) {
    setSsdsSelecionados(
      ssdsSelecionados.map(item =>
        item.ssds.id === ssd.id ? { ...item, quantidade: item.quantidade - 1 } : item
      )
    );
  } else {
    setSsdsSelecionados(ssdsSelecionados.filter(item => item.ssds.id !== ssd.id));
  } 
}
 
 return (
    <>
      <Header></Header>
      <main>
      {etapa !== 'final' && <Hero />}
    {!mostrarLista && (
  <Montarpc onClick={acionarMontador} />
)}

      {mostrarLista && etapa === 'cpu' && ( 
         <CpuList 
          cpuSelecionada={cpuSelecionada}
          onSelecionar={setCpuSelecionada}
         />
      )}
      {cpuSelecionada && etapa === 'cpu' && ( 
        <> 
        <div className="resumo-selecao"> 
        
         <p>Você escolheu: {cpuSelecionada.nome}</p> 
         <p>Preço total: R$ {total.toFixed(2)}</p>
         
          <button onClick={() => setEtapa('motherboard')}>Próximo</button>
          <button onClick={() => setCpuSelecionada(null)}>Voltar</button>
        </div>
        </>
      )}

      {etapa === 'motherboard' && (
        <MotherboardList 
          placaSelecionada={placaSelecionada}
          onSelecionar={setPlacaSelecionada}
        />
      )} 
      {placaSelecionada && etapa === 'motherboard' && (
        <>
        <div className="resumo-selecao">
          <p>Você escolheu: {placaSelecionada.nome}</p>
          {compatibilidadeCpuMb(cpuSelecionada, placaSelecionada) ? (
            <p>Compatível com a CPU selecionada.</p>
          ) : (
            <p>Incompatível com a CPU selecionada.</p>
          )}
          <p>Preço total: R$ {total.toFixed(2)}</p>
          <button onClick={() => setEtapa('gpu')}>Próximo</button>
          <button onClick={() => {setPlacaSelecionada(null), setEtapa('cpu')}}>Voltar</button>
        </div>
        </>
      )}

      {etapa === 'gpu' && (
        <GpuList 
          gpuSelecionada={gpuSelecionada}
          onSelecionar={setGpuSelecionada}
        />
      )}
      {gpuSelecionada && etapa === 'gpu' && (
        <>
          <div className="resumo-selecao">
          <p>Você escolheu: {gpuSelecionada.nome}</p>
          <p>Preço total: R$ {total.toFixed(2)}</p>
          <button onClick={() => setEtapa('ram')}>Próximo</button> 
          <button onClick={() => {setGpuSelecionada(null), setEtapa('motherboard')}}>Voltar</button>
       </div>
        </>
      )} 
     
      {etapa === 'ram' && (
       
        <RamList 
          ramsSelecionadas={ramsSelecionadas}
          onAdicionar={adicionarRam}
          onRemover={removerRam}
          placaSelecionada={placaSelecionada}
        /> 
      )} 
      {ramsSelecionadas.length > 0 && etapa === 'ram' && (
        <>
         <div className="resumo-selecao">
          <p>Você escolheu:</p>
  
          <ul>
            {ramsSelecionadas.map((item) => (
             <li key={item.ram.id}>
             {item.quantidade}x {item.ram.nome} - {' '}
             <span className={compatibilidadeRamMb(item.ram, placaSelecionada) ? 'status-ok' : 'status-erro'}>
             {compatibilidadeRamMb(item.ram, placaSelecionada) ? 'Compatível' : 'Incompatível'}
           </span>
           </li>
            ))}
          </ul>
         <p>Preço total: R$ {total.toFixed(2)}</p>
         <p>Capacidade total: {capacidadeTotalRam}GB <span className={capacidadeOk ? 'status-ok' : 'status-erro'}>{capacidadeOk ? 'OK' : 'Excede o máximo da motherboard'}</span></p>
         <p>Slots: <span className={slotsOk ? 'status-ok' : 'status-erro'}>{slotsOk ? 'Dentro do limite' : 'Excede os slots disponíveis'}</span></p>
         <button onClick={() => setEtapa('ssd')}>Próximo</button> 
         <button onClick={() => {setRamsSelecionadas([]), setEtapa('gpu')}}>Voltar</button>
         </div>
        </>
      )} 
     {etapa === 'ssd' &&  (
        <SsdsList 
          ssdsSelecionados={ssdsSelecionados}
          onAdicionar={adicionarSsd}
          onRemover={removerSsd}
          placaSelecionada={placaSelecionada}
        />
      )} 
      {ssdsSelecionados.length > 0 && etapa === 'ssd' && (
        <>
         <div className="resumo-selecao"> 
          <p>Você escolheu:</p>
         
          <ul>
            {ssdsSelecionados.map((item) => (
              <li key={item.ssds.id}>
                {item.quantidade}x {item.ssds.nome}
              </li>
            ))} 
            </ul>  
             <p>Preço total: R$ {total.toFixed(2)}</p>
            <alert> 
              <p>*IMPORTANTE* Certifique-se de que sua placa mae suporta o tipo e a quantidadede SSDs escolhidos </p>
            </alert> 
             <button onClick={() => setEtapa('psu')}>Próximo</button> 
             <button onClick={() => {setSsdsSelecionados([]), setEtapa('ram')}}>Voltar</button>
       </div>
        </>
        )}  
       {etapa === 'psu' && (
        <PsuList 
          psusSelecionada={psusSelecionada}
          onSelecionar={setPsusSelecionada}
        />
      )} 
      {psusSelecionada && etapa === 'psu' && (
        <>
         <div className="resumo-selecao">
          <p>Você escolheu: {psusSelecionada.nome}</p>
          <p>Preço total: R$ {total.toFixed(2)}</p>
          <p>Consumo estimado: {consumo}W</p>
          <p>PSU suficiente: {psuOk ? <span className="status-ok">Suficiente</span> : <span className="status-erro">Insuficiente</span>}</p>
          <button onClick={() => setEtapa('final')}>Finalizar</button>
          <button onClick={() => {setPsusSelecionada(null), setEtapa('ssd')}}>Voltar</button>
        </div>
        </>
      )}
 {etapa === 'final' && (() => {
  const incompatibilidades = verificarIncompatibilidades({
    cpu: cpuSelecionada,
    motherboard: placaSelecionada,
    ramsSelecionadas,
    gpu: gpuSelecionada,
    psu: psusSelecionada
  });

  return (
    <div className="resumo-final">
      <h2>Resumo da sua Build</h2>

      {incompatibilidades.length > 0 && (
        <div className="alerta-incompatibilidade">
          <strong>⚠ {incompatibilidades.length} incompatibilidade(s) detectada(s)</strong>
          <ul>
            {incompatibilidades.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )}

      <div className="recibo">
        <div className="recibo-linha"><span>CPU</span><span>{cpuSelecionada?.nome}</span><span>R${cpuSelecionada.preco}</span></div>
        <div className="recibo-linha"><span>Placa-mãe</span><span>{placaSelecionada?.nome}</span><span>R${placaSelecionada?.preco}</span></div>
        <div className="recibo-linha"><span>GPU</span><span>{gpuSelecionada?.nome}</span><span>R${gpuSelecionada?.preco}</span></div>

        {ramsSelecionadas.map((item) => (
          <div className="recibo-linha" key={item.ram.id}>
            <span>RAM ({item.quantidade}x)</span><span>{item.ram.nome}</span><span>R${item.ram.preco}</span>
          </div>
        ))}

        {ssdsSelecionados.map((item) => (
          <div className="recibo-linha" key={item.ssds.id}>
            <span>SSD ({item.quantidade}x)</span><span>{item.ssds.nome}</span><span>R${item.ssds.preco}</span>
          </div>
        ))}

        <div className="recibo-linha"><span>Fonte</span><span>{psusSelecionada?.nome}</span><span>R${psusSelecionada?.preco}</span></div>
      </div>

      <hr />

      <p className="resumo-final-preco">Preço total: R$ {total.toFixed(2)}</p>

      <button onClick={() => setEtapa('psu')}>Editar</button>
      <button 
        className={incompatibilidades.length > 0 ? "btn-baixar-alerta" : ""}
        onClick={baixarResumo}
      >
        {incompatibilidades.length > 0 ? "Baixar mesmo assim" : "Baixar resumo"}
      </button>
    </div>
  );
})()}


   </main>
    </>
  );
}
export default App;