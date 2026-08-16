import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const links = [
  { to: '/', label: 'Início' },
  { to: '/historia', label: 'Nossa História' },
  { to: '/informacoes', label: 'Informações' },
  { to: '/presentes', label: 'Presentes' },
  { to: '/recados', label: 'Recados' },
]

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
        L&amp;R
      </NavLink>

      <button
        className="navbar__toggle"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
            onClick={() => setOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default NavBar
