export { API_URL } from './api.js'

export const CATEGORIAS = [
  { slug: 'cpu',             titulo: 'Processadores',  menu: 'Processadores',            endpoint: '/api/cpus' },
  { slug: 'placa-mae',       titulo: 'Placas-mãe',     menu: 'Placa-mãe',      endpoint: '/api/motherboards' },
  { slug: 'placa-de-video',  titulo: 'Placas de vídeo', menu: 'Placa de vídeo', endpoint: '/api/gpus' },
  { slug: 'memoria-ram',     titulo: 'Memórias RAM',   menu: 'Memória RAM',    endpoint: '/api/rams' },
  { slug: 'ssd',             titulo: 'SSDs',           menu: 'Armazenamento',            endpoint: '/api/ssds' },
  { slug: 'fonte',           titulo: 'Fontes',         menu: 'Fonte',          endpoint: '/api/psus' },
  { slug: 'cooler',          titulo: 'Coolers',        menu: 'Cooler',         endpoint: '/api/coolers' },
  { slug: 'gabinete',        titulo: 'Gabinetes',      menu: 'Gabinete',       endpoint: '/api/cases' },
  
]