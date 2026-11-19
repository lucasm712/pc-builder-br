import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CATEGORIAS, API_URL } from './Categorias.jsx'

function formatarPreco(preco) {
  const n = Number(preco)
  if (preco === null || preco === undefined || Number.isNaN(n)) return 'Preço indisponível'
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function CardPeca({ item }) {
  const [imgErro, setImgErro] = useState(false)
  return (
    <div className="catalogo-item">
      <div className="item-card">
        {item.imagemUrl && !imgErro ? (
          <img
            src={item.imagemUrl}
            alt={item.nome}
            loading="lazy"
            onError={() => setImgErro(true)}
          />
        ) : (
          <div className="catalogo-sem-imagem">sem imagem</div>
        )}
        <div className="item-info">
          <span className="item-nome">{item.nome}</span>
          <span className="item-preco">{formatarPreco(item.preco)}</span>
        </div>
      </div>
    </div>
  )
}

function CatalogoPage() {
  const { categoria } = useParams()
  const config = CATEGORIAS.find((c) => c.slug === categoria)

  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('nome')

  useEffect(() => {
    if (!config) return
    let cancelado = false

    setCarregando(true)
    setErro(null)
    setBusca('')

    fetch(`${API_URL}${config.endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then((dados) => {
        if (!cancelado) setItens(dados)
      })
      .catch(() => {
        if (!cancelado) setErro('Não foi possível carregar as peças. O servidor está rodando?')
      })
      .finally(() => {
        if (!cancelado) setCarregando(false)
      })

    return () => {
      cancelado = true
    }
  }, [config])

  if (!config) return <p className="catalogo-vazio">Categoria não encontrada.</p>

  const filtrados = itens
    .filter((i) => i.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (ordem === 'nome') return a.nome.localeCompare(b.nome)
      // itens sem preço vão sempre pro final
      const pa = a.preco == null ? Infinity : Number(a.preco)
      const pb = b.preco == null ? Infinity : Number(b.preco)
      if (pa === Infinity && pb === Infinity) return 0
      if (pa === Infinity) return 1
      if (pb === Infinity) return -1
      return ordem === 'menor' ? pa - pb : pb - pa
    })

  return (
    <main className="catalogo">
      <h2 className="catalogo-titulo">{config.titulo}</h2>

      <div className="catalogo-filtros">
        <input
          type="search"
          placeholder={`Buscar em ${config.titulo.toLowerCase()}...`}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
          <option value="nome">Nome (A-Z)</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
        </select>
      </div>

      {carregando && <p className="catalogo-vazio">Carregando...</p>}
      {erro && <p className="catalogo-vazio status-erro">{erro}</p>}

      {!carregando && !erro && (
        <>
          <p className="catalogo-contagem">{filtrados.length} produto(s)</p>
          {filtrados.length === 0 ? (
            <p className="catalogo-vazio">Nenhum produto encontrado.</p>
          ) : (
            <div className="catalogo-grid">
              {filtrados.map((item) => (
                <CardPeca key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default CatalogoPage