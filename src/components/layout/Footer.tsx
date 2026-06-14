import { Link } from 'react-router-dom'

const EXPLORE_LINKS = [
  { label: 'Menu & Order Online', to: '/menu' },
  { label: 'Catering & Classes', to: '/catering' },
  { label: 'Sushi Classes', to: '/classes' },
  { label: 'Gift Cards', to: '/gift-cards' },
]

const COMPANY_LINKS = [
  { label: 'About Isekai', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img
            src="/logo.webp"
            alt="Isekai Sushi & Cafe"
            className="footer-logo-img"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              const fallback = img.parentElement?.querySelector('.footer-logo-fallback') as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <div className="footer-logo-fallback" style={{ display: 'none' }}>
            <div className="footer-logo-mark">IS</div>
          </div>
          <p className="footer-tagline">
            Fresh sushi, boba, and Japanese street food made with heart — Tampa, FL.
          </p>
        </div>

        <div>
          <p className="footer-col-title">Explore</p>
          <div className="footer-links">
            {EXPLORE_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-col-title">Visit</p>
          <address className="footer-address" style={{ fontStyle: 'normal' }}>
            5717 Gunn Hwy<br />
            Tampa, FL 33625<br />
            <br />
            <a href="tel:+18133770977" className="footer-phone">(813) 377-0977</a>
          </address>
        </div>

        <div>
          <p className="footer-col-title">Company</p>
          <div className="footer-links" style={{ marginBottom: '20px' }}>
            {COMPANY_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="footer-social-row">
            <a
              href="https://www.instagram.com/isekaisushicafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/isekaisushi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@isekaisushicafe"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="TikTok"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.85a8.22 8.22 0 0 0 4.82 1.55V7a4.85 4.85 0 0 1-1.05-.31Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Isekai Sushi & Cafe. All rights reserved.</span>
        <span>Tampa, FL · Mon–Sat 11am–9pm</span>
      </div>
    </footer>
  )
}
