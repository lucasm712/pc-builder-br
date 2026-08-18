function Montarpc(props) { 
     return ( 
        <div className="montarpc-wrapper">
          <button onClick={props.onClick}>MONTAR PC</button>

        
<div className="montarpc">
            <div className="montarpc-item">
              <h3> Compatibilidade </h3>
              <p>Validação automática de socket, tipo de RAM, capacidade, slots e consumo de energia, evitando erro na hora de montar.</p>
            </div>
            
            
            <div className="montarpc-item">
              <h3>Feito pro Brasil </h3>
              <p>Uma plataforma focada no mercado brasileiro de hardware, com preços em BRL e peças que geralmente estao disponiveis em estoque no Brasil.</p>
            </div>
           
            <div className="montarpc-item">
              <h3> Monte do seu jeito</h3>
  <p>Escolha peça por peça, com variedade de escolhas, de gabinte a processador e veja sua build tomar forma em tempo real.</p>
            </div>
          </div>
        </div>
     );
} 

export default Montarpc;