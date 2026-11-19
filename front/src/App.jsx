import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Header.jsx'
import Home from './Home.jsx'
import CatalogoPage from './CatalogoPage.jsx'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pecas/:categoria" element={<CatalogoPage />} />
        <Route path="*" element={<p className="catalogo-vazio">Página não encontrada.</p>} />
      </Routes>
    </>
  )
}

export default App