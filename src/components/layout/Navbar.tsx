import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Explore', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Catering', to: '/catering' },
  { label: 'Visit', to: '/#visit' },
  { label: 'Reviews', to: '/#reviews' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img
            src="/logo.webp"
            alt="Isekai Sushi & Cafe"
            className="nav-logo-img"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              const fallback = img.parentElement?.querySelector('.nav-logo-fallback') as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <div className="nav-logo-fallback" style={{ display: 'none' }}>
            <div className="nav-logo-mark">IS</div>
            <div>
              <div className="nav-logo-text">Isekai Sushi</div>
              <div className="nav-logo-sub">& Cafe</div>
            </div>
          </div>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} to={l.to} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/order" className="nav-cta">
          Order Online
        </Link>

        <button
          className="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="nav-mobile-bar" />
          <span className="nav-mobile-bar" />
          <span className="nav-mobile-bar" />
        </button>
      </div>

      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/order"
          className="nav-mobile-cta"
          onClick={() => setOpen(false)}
        >
          Order Online
        </Link>
      </div>
    </nav>
  )
}
