import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { CATS, IMGS, TAG_COLORS, MENU, UPSELL_IDS, fmt } from './data'
import type { CartEntry } from './data'

interface MenuViewProps {
  cart: CartEntry[]
  activeCat: string
  onCatChange: (cat: string) => void
  onOpenItem: (id: string) => void
  onAddItem: (id: string) => void
  onGoCart: () => void
}

export default function MenuView({ cart, activeCat, onCatChange, onOpenItem, onAddItem, onGoCart }: MenuViewProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  const cartCount = cart.reduce((s, c) => s + c.qty, 0)
  const subtotal = cart.reduce((s, c) => {
    const m = MENU.find(x => x.id === c.id)
    return s + (m ? m.price * c.qty : 0)
  }, 0)

  const popular = MENU.filter(m => m.tags.includes('Popular') || m.cat === 'Popular').slice(0, 5)
  const menuList = activeCat === 'All'
    ? MENU
    : activeCat === 'Popular'
    ? MENU.filter(m => m.cat === 'Popular')
    : MENU.filter(m => m.cat === activeCat)
  const visibleMenu = menuList.length ? menuList : MENU.slice(0, 4)
  const showPopularRow = activeCat === 'All' || activeCat === 'Popular'

  const upsells = UPSELL_IDS.map(id => MENU.find(m => m.id === id)!).filter(Boolean)

  useGSAP(() => {
    const panel = panelRef.current
    const page = panel?.closest('.ord-page') as HTMLElement | null
    if (!panel || !page) return

    const COLLAPSE_RANGE = 180
    const setProgress = (pct: number) => {
      panel.style.setProperty('--hero-scroll', String(pct))
      page.style.setProperty('--hero-scroll', String(pct))
      panel.classList.toggle('ord-panel--scrolled', pct >= 0.98)
      page.classList.toggle('ord-page--scrolled', pct >= 0.98)
    }

    gsap.set([panel, page], { '--hero-scroll': 0 })

    const trigger = ScrollTrigger.create({
      trigger: panel,
      start: 'top top',
      end: '+=' + COLLAPSE_RANGE,
      scrub: 0.35,
      onUpdate: (self) => setProgress(self.progress),
      onRefresh: (self) => setProgress(self.progress),
    })

    return () => {
      trigger.kill()
      panel.classList.remove('ord-panel--scrolled')
      page.classList.remove('ord-page--scrolled')
      panel.style.removeProperty('--hero-scroll')
      page.style.removeProperty('--hero-scroll')
    }
  }, { scope: panelRef })

  return (
    <div className="ord-panel-inner" ref={panelRef}>
      <div className="ord-panel-scroll">
      {/* HERO */}
      <div className="ord-hero">
        <img
          src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1800&q=80"
          alt="Isekai Sushi"
          className="ord-hero-img"
        />
        <div className="ord-hero-overlay" />
        <div className="ord-hero-content">
          <div className="ord-open-pill">
            <span className="ord-open-dot" />
            Open · Pickup in 15 min
          </div>
          <h2 className="ord-hero-name">Isekai Sushi &amp; Cafe</h2>
          <div className="ord-hero-meta">
            <span className="ord-hero-stars">★ <strong>4.9</strong> <span className="ord-hero-count">(950+)</span></span>
            <span className="ord-hero-dot" />
            <span className="ord-hero-address">5717 Gunn Hwy, Tampa</span>
            <span className="ord-hero-pickup">Pickup in 15 min</span>
          </div>
        </div>
      </div>

      {/* SEARCH + CHIPS — wrapped for desktop sticky strip */}
      <div className="ord-sticky-controls">
        <div className="ord-search-wrap">
          <div className="ord-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a8d80" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
            <span className="ord-search-placeholder">Search rolls, ramen, boba&hellip;</span>
          </div>
        </div>

        <div className="ord-chips-sticky">
          <div className="ord-chips">
            {CATS.map(cat => (
              <button
                key={cat}
                className="ord-chip"
                onClick={() => onCatChange(cat)}
                style={activeCat === cat
                  ? { background: '#1C1A19', color: '#F7F1E7', borderColor: '#1C1A19' }
                  : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ord-order-header-spacer" aria-hidden="true" />

      {/* POPULAR ROW */}
      {showPopularRow && <div className="ord-section ord-section--popular">
        <div className="ord-section-header">
          <div>
            <div className="ord-eyebrow">Most Ordered Today</div>
            <h3 className="ord-section-title">Signature Favorites</h3>
          </div>
        </div>
        <div className="ord-pop-row">
          {popular.map(item => (
            <div key={item.id} className="ord-pop-card" onClick={() => onOpenItem(item.id)}>
              <div className="ord-pop-card-img-wrap">
                <img src={IMGS[item.id]} alt={item.name} className="ord-pop-card-img" />
                <div className="ord-pop-card-overlay" />
                <span className="ord-pop-pill">★ Popular</span>
                <button
                  className="ord-pop-add"
                  onClick={e => { e.stopPropagation(); onAddItem(item.id) }}
                >+</button>
                <div className="ord-pop-card-info">
                  <div className="ord-pop-card-name">{item.name}</div>
                  <div className="ord-pop-card-price">{fmt(item.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}

      {/* MENU GRID */}
      <div className="ord-menu-section">
        <div className="ord-menu-header">
          <h3 className="ord-section-title" style={{ color: '#1C1A19' }}>{activeCat === 'All' ? 'Full Menu' : activeCat}</h3>
          <span className="ord-menu-count">{visibleMenu.length} items</span>
        </div>
        <div className="ord-menu-list">
          {visibleMenu.map(item => {
            const tags = item.tags.slice(0, 2)
            return (
              <div key={item.id} className="ord-menu-card">
                <div className="ord-menu-card-img-wrap" onClick={() => onOpenItem(item.id)}>
                  <img src={IMGS[item.id]} alt={item.name} className="ord-menu-card-img" />
                  {tags.length > 0 && (
                    <div className="ord-menu-card-tags">
                      {tags.map(t => (
                        <span
                          key={t}
                          className="ord-tag"
                          style={{ background: TAG_COLORS[t]?.bg, color: TAG_COLORS[t]?.color }}
                        >{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ord-menu-card-body">
                  <div className="ord-menu-card-text" onClick={() => onOpenItem(item.id)}>
                    <h4 className="ord-menu-card-name">{item.name}</h4>
                    <p className="ord-menu-card-desc">{item.desc}</p>
                  </div>
                  <div className="ord-menu-card-footer">
                    <span className="ord-menu-card-price">{fmt(item.price)}</span>
                    <button className="ord-add-btn" onClick={() => onAddItem(item.id)}>
                      <span>+</span> Add
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* UPSELLS at bottom for empty categories */}
        {menuList.length === 0 && (
          <div className="ord-upsell-section">
            <div className="ord-eyebrow" style={{ color: '#A62B1C', marginBottom: '12px' }}>Add a little extra?</div>
            <div className="ord-upsell-row">
              {upsells.map(item => (
                <div key={item.id} className="ord-upsell-card">
                  <div className="ord-upsell-img-wrap">
                    <img src={IMGS[item.id]} alt={item.name} className="ord-upsell-img" />
                  </div>
                  <div className="ord-upsell-body">
                    <div className="ord-upsell-name">{item.name}</div>
                    <div className="ord-upsell-footer">
                      <span className="ord-upsell-price">{fmt(item.price)}</span>
                      <button className="ord-upsell-add" onClick={() => onAddItem(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: '80px' }} />
      </div>
      </div>{/* end ord-panel-scroll */}

      {/* FLOATING CART BAR */}
      {cartCount > 0 && (
        <button className="ord-cart-bar" onClick={onGoCart}>
          <span className="ord-cart-bar-left">
            <span className="ord-cart-bar-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
            </span>
            <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          </span>
          <span className="ord-cart-bar-right">
            View order · {fmt(subtotal)} <span className="ord-cart-bar-arrow">›</span>
          </span>
        </button>
      )}
    </div>
  )
}
