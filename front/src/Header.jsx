import { Link, NavLink } from 'react-router-dom'
import { CATEGORIAS } from './Categorias.jsx'

function Header() {
  return (
    <header className="site-header">
      <h1 className="site-titulo">
        <Link to="/">PC BUILDER BR</Link>
      </h1>

      <nav className="site-nav" aria-label="Categorias de peças">
        {CATEGORIAS.map((cat) => (
          <NavLink
            key={cat.slug}
            to={`/pecas/${cat.slug}`}
            className={({ isActive }) => (isActive ? 'nav-link ativo' : 'nav-link')}
          >
            {cat.menu}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header