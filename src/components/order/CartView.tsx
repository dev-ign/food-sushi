import { MENU, IMGS, UPSELL_IDS, fmt } from './data'
import type { CartEntry } from './data'

interface CartViewProps {
  cart: CartEntry[]
  onChangeQty: (id: string, delta: number) => void
  onAddItem: (id: string) => void
  onBack: () => void
  onGoCheckout: () => void
}

export default function CartView({ cart, onChangeQty, onAddItem, onBack, onGoCheckout }: CartViewProps) {
  const lines = cart.map(c => {
    const m = MENU.find(x => x.id === c.id)!
    const isMild = ['Boba', 'Drinks', 'Appetizers', 'Nigiri', 'Sashimi'].includes(m?.cat ?? '')
    return { ...m, qty: c.qty, line: (m?.price ?? 0) * c.qty, optStr: isMild ? 'Regular' : 'Medium spice' }
  })

  const subtotal = lines.reduce((s, c) => s + c.line, 0)
  const tax = subtotal * 0.075
  const total = subtotal + tax

  const upsells = UPSELL_IDS
    .map(id => MENU.find(m => m.id === id)!)
    .filter(m => m && !cart.find(c => c.id === m.id))
    .slice(0, 3)

  return (
    <div className="ord-panel-inner ord-panel-inner--cream">
      {/* HEADER */}
      <div className="ord-view-header">
        <div>
          <div className="ord-eyebrow" style={{ color: '#A62B1C', marginBottom: '3px' }}>Pickup · 15–20 min</div>
          <h2 className="ord-view-title">Your Order</h2>
        </div>
        <button className="ord-header-close" onClick={onBack} aria-label="Close cart">×</button>
      </div>

      {/* PICKUP BANNER */}
      <div className="ord-pickup-banner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A62B1C" strokeWidth="2">
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" strokeLinejoin="round" />
        </svg>
        <span>Pickup from <strong>5717 Gunn Hwy</strong>, Tampa · Ready ~11:48</span>
      </div>

      {/* SCROLL AREA */}
      <div className="ord-scroll-body">
        {cart.length === 0 ? (
          <div className="ord-empty-cart">
            <div className="ord-empty-icon">🍱</div>
            <h3 className="ord-empty-title">Your cart is empty</h3>
            <p className="ord-empty-desc">Add a roll from the menu to get started.</p>
          </div>
        ) : (
          <>
            <div className="ord-cart-lines">
              {lines.map(line => (
                <div key={line.id} className="ord-cart-line">
                  <div className="ord-cart-line-img">
                    <img src={IMGS[line.id]} alt={line.name} />
                  </div>
                  <div className="ord-cart-line-body">
                    <div className="ord-cart-line-name">{line.name}</div>
                    <div className="ord-cart-line-opt">{line.optStr}</div>
                    <div className="ord-cart-line-footer">
                      <div className="ord-qty">
                        <button className="ord-qty-btn ord-qty-dec" onClick={() => onChangeQty(line.id, -1)}>−</button>
                        <span className="ord-qty-val">{line.qty}</span>
                        <button className="ord-qty-btn ord-qty-inc" onClick={() => onChangeQty(line.id, 1)}>+</button>
                      </div>
                      <span className="ord-cart-line-price">{fmt(line.line)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* UPSELLS */}
            {upsells.length > 0 && (
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
          </>
        )}
        <div style={{ height: '16px' }} />
      </div>

      {/* FOOTER */}
      {cart.length > 0 && (
        <div className="ord-panel-footer">
          <div className="ord-summary">
            <div className="ord-summary-row">
              <span>Subtotal</span><span>{fmt(subtotal)}</span>
            </div>
            <div className="ord-summary-row">
              <span>Tax</span><span>{fmt(tax)}</span>
            </div>
            <div className="ord-summary-row ord-summary-total">
              <span>Total</span><span>{fmt(total)}</span>
            </div>
          </div>
          <button className="ord-primary-btn" onClick={onGoCheckout}>
            Go to Checkout <span className="ord-btn-arrow">›</span>
          </button>
        </div>
      )}
    </div>
  )
}
