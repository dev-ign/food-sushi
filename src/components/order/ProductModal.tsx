import { useEffect } from 'react'
import { MENU, IMGS, ADDONS, SPICE, fmt } from './data'

interface ProductModalProps {
  itemId: string | null
  qty: number
  spice: string
  addons: string[]
  onClose: () => void
  onIncQty: () => void
  onDecQty: () => void
  onToggleSpice: (s: string) => void
  onToggleAddon: (id: string) => void
  onAdd: () => void
  onAddPairing: (id: string) => void
}

export default function ProductModal({
  itemId, qty, spice, addons,
  onClose, onIncQty, onDecQty, onToggleSpice, onToggleAddon, onAdd, onAddPairing,
}: ProductModalProps) {
  const item = MENU.find(m => m.id === itemId) ?? null

  useEffect(() => {
    if (!itemId) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [itemId])

  const addonTotal = addons.reduce((s, aId) => {
    const a = ADDONS.find(x => x.id === aId)
    return s + (a?.price ?? 0)
  }, 0)
  const modalTotal = item ? (item.price + addonTotal) * qty : 0

  const pairings = item
    ? MENU.filter(m => m.id !== item.id && (m.cat === 'Boba' || m.cat === 'Appetizers' || m.tags.includes('Popular'))).slice(0, 4)
    : []

  return (
    <>
      <div
        className={`ord-modal-back ${itemId ? 'ord-modal-back--open' : ''}`}
        onClick={onClose}
      />
      <div className={`ord-modal ${itemId ? 'ord-modal--open' : ''}`}>
        {/* HERO IMAGE */}
        <div className="ord-modal-hero">
          {item && (
            <img src={IMGS[item.id]} alt={item.name} className="ord-modal-hero-img" />
          )}
          <div className="ord-modal-hero-overlay" />
          <button className="ord-modal-close" onClick={onClose}>×</button>
          <div className="ord-modal-dots">
            <span className="ord-modal-dot ord-modal-dot--active" />
            <span className="ord-modal-dot" />
            <span className="ord-modal-dot" />
          </div>
        </div>

        {/* SCROLL BODY */}
        <div className="ord-modal-body">
          <div className="ord-modal-title-row">
            <h3 className="ord-modal-name">{item?.name}</h3>
            <span className="ord-modal-price">{item ? fmt(item.price) : ''}</span>
          </div>
          <p className="ord-modal-desc">{item?.desc}</p>

          {/* SPICE */}
          <div className="ord-modal-section-label">Spice Level</div>
          <div className="ord-spice-opts">
            {SPICE.map(s => (
              <button
                key={s}
                className="ord-spice-btn"
                onClick={() => onToggleSpice(s)}
                style={spice === s
                  ? { background: '#A62B1C', color: '#fff', borderColor: '#A62B1C' }
                  : undefined}
              >{s}</button>
            ))}
          </div>

          {/* ADD-ONS */}
          <div className="ord-modal-section-label">Add-ons</div>
          <div className="ord-addons">
            {ADDONS.map(a => {
              const on = addons.includes(a.id)
              return (
                <button
                  key={a.id}
                  className="ord-addon-row"
                  onClick={() => onToggleAddon(a.id)}
                  style={{
                    borderColor: on ? '#A62B1C' : 'rgba(28,26,25,.1)',
                    background: on ? 'rgba(166,43,28,.05)' : '#fff',
                  }}
                >
                  <span className="ord-addon-left">
                    <span
                      className="ord-addon-check"
                      style={{
                        background: on ? '#A62B1C' : 'transparent',
                        border: on ? 'none' : '2px solid rgba(28,26,25,.2)',
                      }}
                    >{on ? '✓' : ''}</span>
                    <span className="ord-addon-name">{a.name}</span>
                  </span>
                  <span className="ord-addon-price">+{fmt(a.price)}</span>
                </button>
              )
            })}
          </div>

          {/* PAIRINGS */}
          {pairings.length > 0 && (
            <>
              <div className="ord-modal-section-label">Pairs Well With</div>
              <div className="ord-pairings">
                {pairings.map(p => (
                  <div key={p.id} className="ord-pairing-card" onClick={() => onAddPairing(p.id)}>
                    <div className="ord-pairing-img-wrap">
                      <img src={IMGS[p.id]} alt={p.name} className="ord-pairing-img" />
                      <span className="ord-pairing-add">+</span>
                    </div>
                    <div className="ord-pairing-name">{p.name}</div>
                    <div className="ord-pairing-price">{fmt(p.price)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ height: '8px' }} />
        </div>

        {/* FOOTER */}
        <div className="ord-modal-footer">
          <div className="ord-qty">
            <button className="ord-qty-btn ord-qty-dec" onClick={onDecQty}>−</button>
            <span className="ord-qty-val">{qty}</span>
            <button className="ord-qty-btn ord-qty-inc" onClick={onIncQty}>+</button>
          </div>
          <button className="ord-modal-add-btn" onClick={onAdd}>
            <span>Add to Order</span>
            <span>{fmt(modalTotal)}</span>
          </button>
        </div>
      </div>
    </>
  )
}
