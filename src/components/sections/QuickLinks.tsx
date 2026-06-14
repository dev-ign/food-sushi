import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const POPULAR_ITEMS = [
  {
    name: 'Internal Combustion Roll',
    price: '$16.75',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'ARGHH Roll',
    price: '$15.95',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Salmon Nigiri',
    price: '$7.50',
    badge: 'Chef Favorite',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Twin Bao Buns',
    price: '$9.75',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Karaage Chicken',
    price: '$10.95',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Brown Sugar Milk Tea',
    price: '$6.50',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=900&q=85',
  },
]

export default function QuickLinks() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { stagger: 0.08, y: 30 })

  return (
    <section className="quick-actions popular-items" ref={ref}>
      <div className="quick-actions-header site-container">
        <p className="section-eyebrow" data-reveal>Most Popular Items</p>
        <h2 className="section-title" data-reveal>Guest Favorites</h2>
      </div>

      <div className="quick-actions-grid popular-items-grid site-container">
        {POPULAR_ITEMS.map((item) => (
          <a
            key={item.name}
            className="popular-item-card"
            href="https://order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            <img className="popular-item-image" src={item.image} alt={item.name} loading="lazy" />
            {item.badge ? <span className="popular-item-badge">{item.badge}</span> : null}
            <div className="popular-item-overlay">
              <h3 className="popular-item-name">{item.name}</h3>
              <p className="popular-item-price">{item.price}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="popular-items-footer site-container" data-reveal>
        <a href="/menu" className="btn-red popular-items-menu-link">
          View Full Menu
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
