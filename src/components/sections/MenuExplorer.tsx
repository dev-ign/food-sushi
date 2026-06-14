import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const CATEGORIES: { label: string; image: string; note: string }[] = [
  {
    label: 'Signature Rolls',
    note: 'Chef-crafted rolls',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Nigiri & Sashimi',
    note: 'Fresh cuts daily',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Appetizers',
    note: 'Small bites',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Ramen & Bowls',
    note: 'Comfort classics',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Boba & Milk Tea',
    note: 'Sweet sips',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Desserts',
    note: 'A soft finish',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85',
  },
]

export default function MenuExplorer() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { stagger: 0.07, y: 28 })

  return (
    <section className="menu" ref={ref} id="menu">
      <div className="menu-header site-container" data-reveal>
        <p className="section-eyebrow">Explore Our Menu</p>
        <h2 className="section-title">Made Fresh Daily</h2>
        <p className="menu-subtitle">
          Every item is crafted to order using fresh, quality ingredients — no compromises.
        </p>
      </div>

      <div className="menu-grid site-container">
        {CATEGORIES.map(({ label, image, note }) => (
          <Link key={label} to="/menu" className="menu-cat-card" data-reveal>
            <img className="menu-cat-image" src={image} alt={label} loading="lazy" />
            <div className="menu-cat-overlay">
              <span className="menu-cat-note">{note}</span>
              <div className="menu-cat-label-row">
                <span className="menu-cat-label">{label}</span>
                <span className="menu-cat-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="menu-cta site-container" data-reveal>
        <Link to="/menu" className="btn-dark">
          View Full Menu & Order Online
        </Link>
      </div>
    </section>
  )
}
