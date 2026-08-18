
export function compatibilidadeCpuMb (cpu, motherboard) { 
    let cpuCompativel = cpu.socketId === motherboard.socketId;
    return cpuCompativel
}

export function compatibilidadeRamMb (ram,motherboard) {
    let ramCompativel = ram.tipo === motherboard.tipoRam;
    return ramCompativel 
}
   
export function ramCalculo (ram) { 
let ramCalculo = ram.tamanho * ram.pentes; 
    return ramCalculo   
} 
export function ramLimit (motherboard,ramCalculo) {
     let ramLimit = motherboard.Maximo_de_ram >= ramCalculo;
     return ramLimit
}
export function limiteSlot (motherboard,ram) {
    let slotLimite = motherboard.slots_de_memoria >= ram.pentes; 
    return slotLimite
} 

export function limiteSlotTotal(motherboard, ramsSelecionadas) {
    const totalPentes = ramsSelecionadas.reduce(
        (total, item) => total + (item.ram.pentes * item.quantidade), 
        0
    );
    return motherboard.slots_de_memoria >= totalPentes;
} 

export function consumoTotal(cpu, gpu) {
  const tdpCpu = cpu?.wtts || 0;
  const tdpGpu = gpu?.tdp || 0;
  return tdpCpu + tdpGpu;
} 

export function psuSuficiente(psu, consumo) {
  
  const consumoComMargem = consumo * 1.2;
  return psu.wtts >= consumoComMargem;
} 

export function precoTotal({ cpu, motherboard, gpu, rams, ssds, psu }) {
  const precoCpu = cpu?.preco ? Number(cpu.preco) : 0;
  const precoMb = motherboard?.preco ? Number(motherboard.preco) : 0;
  const precoGpu = gpu?.preco ? Number(gpu.preco) : 0;
  const precoPsu = psu?.preco ? Number(psu.preco) : 0;

  const precoRams = rams.reduce(
    (total, item) => total + (Number(item.ram.preco) || 0) * item.quantidade,
    0
  );

  const precoSsds = ssds.reduce(
    (total, item) => total + (Number(item.ssds.preco) || 0) * item.quantidade,
    0
  );

  return precoCpu + precoMb + precoGpu + precoPsu + precoRams + precoSsds;
} 
  
export function verificarIncompatibilidades({ cpu, motherboard, ramsSelecionadas, gpu, psu }) {
  const problemas = [];

  
  if (cpu && motherboard && !compatibilidadeCpuMb(cpu, motherboard)) {
    problemas.push(
      `CPU (${cpu.nome}, soquete ${cpu.socketId}) incompatível com a placa-mãe (${motherboard.nome}, soquete ${motherboard.socketId})`
    );
  }

  
  if (motherboard && ramsSelecionadas?.length > 0) {
    ramsSelecionadas.forEach(item => {
      if (!compatibilidadeRamMb(item.ram, motherboard)) {
        problemas.push(
          `Memória RAM (${item.ram.nome}, ${item.ram.tipo}) incompatível com a placa-mãe (aceita ${motherboard.tipoRam})`
        );
      }
    });

    
    if (!limiteSlotTotal(motherboard, ramsSelecionadas)) {
      const totalPentes = ramsSelecionadas.reduce((t, item) => t + item.quantidade, 0);
      problemas.push(
        `Quantidade de módulos de RAM (${totalPentes}) excede os slots disponíveis na placa-mãe (${motherboard.slots_de_memoria})`
      );
    }

    
    const totalRamGb = ramsSelecionadas.reduce(
      (total, item) => total + ramCalculo(item.ram) * item.quantidade, 0
    );
    if (!ramLimit(motherboard, totalRamGb)) {
      problemas.push(
        `Capacidade total de RAM (${totalRamGb}GB) excede o máximo suportado pela placa-mãe (${motherboard.Maximo_de_ram}GB)`
      );
    }
  }

  
  if (cpu && gpu && psu) {
    const consumo = consumoTotal(cpu, gpu);
    if (!psuSuficiente(psu, consumo)) {
      problemas.push(
        `Fonte (${psu.nome}, ${psu.wtts}W) pode ser insuficiente para o consumo estimado (${consumo}W, recomendado ${(consumo * 1.2).toFixed(0)}W com margem)`
      );
    }
  }

  return problemas;
}