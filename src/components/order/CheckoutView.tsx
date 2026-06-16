import { MENU, IMGS, TIPS, fmt } from './data'
import type { CartEntry } from './data'

type FulfillMode = 'pickup' | 'delivery'

interface CheckoutViewProps {
  cart: CartEntry[]
  step: number
  mode: FulfillMode
  tip: number
  onPrevStep: () => void
  onNextStep: () => void
  onSetMode: (mode: FulfillMode) => void
  onSetTip: (val: number) => void
  onPlaceOrder: () => void
}

const STEP_LABELS = ['Review', 'Pickup', 'Pay']
const STEP_TITLES = ['Order Review', 'Pickup Details', 'Payment']

export default function CheckoutView({
  cart, step, mode, tip,
  onPrevStep, onNextStep, onSetMode, onSetTip, onPlaceOrder,
}: CheckoutViewProps) {
  const lines = cart.map(c => {
    const m = MENU.find(x => x.id === c.id)!
    const isMild = ['Boba', 'Drinks', 'Appetizers', 'Nigiri', 'Sashimi'].includes(m?.cat ?? '')
    return { ...m, qty: c.qty, line: (m?.price ?? 0) * c.qty, optStr: isMild ? 'Regular' : 'Medium spice' }
  })

  const subtotal = lines.reduce((s, c) => s + c.line, 0)
  const tax = subtotal * 0.075
  const tipAmt = subtotal * tip
  const grand = subtotal + tax + tipAmt

  const handleBack = () => {
    if (step === 0) onPrevStep()
    else onPrevStep()
  }

  const handlePrimary = () => {
    if (step < 2) onNextStep()
    else onPlaceOrder()
  }

  const primaryLabel = step === 0
    ? 'Continue to Pickup'
    : step === 1
    ? 'Continue to Payment'
    : `Place Order · ${fmt(grand)}`

  return (
    <div className="ord-panel-inner ord-panel-inner--cream">
      {/* HEADER */}
      <div className="ord-checkout-header">
        <button className="ord-back-btn" onClick={handleBack} aria-label="Back">‹</button>
        <h2 className="ord-checkout-title">{STEP_TITLES[step]}</h2>
      </div>

      {/* STEPPER */}
      <div className="ord-stepper">
        {STEP_LABELS.map((label, i) => {
          const done = i < step
          const active = i === step
          return (
            <div key={label} className="ord-stepper-item">
              <div className="ord-stepper-col">
                <span
                  className="ord-step-dot"
                  style={{
                    background: done || active ? '#A62B1C' : '#fff',
                    color: done || active ? '#fff' : '#9a8d80',
                    border: done || active ? 'none' : '1px solid rgba(28,26,25,.15)',
                  }}
                >{done ? '✓' : i + 1}</span>
                <span
                  className="ord-step-label"
                  style={{ color: active ? '#A62B1C' : '#9a8d80' }}
                >{label}</span>
              </div>
              {i < 2 && (
                <span
                  className="ord-step-line"
                  style={{ background: done ? '#A62B1C' : 'rgba(28,26,25,.12)' }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* SCROLL BODY */}
      <div className="ord-scroll-body">
        {/* STEP 0: ORDER REVIEW */}
        {step === 0 && (
          <>
            <div className="ord-review-lines">
              {lines.map(line => (
                <div key={line.id} className="ord-review-line">
                  <div className="ord-review-img">
                    <img src={IMGS[line.id]} alt={line.name} />
                  </div>
                  <div className="ord-review-info">
                    <div className="ord-review-name">{line.name}</div>
                    <div className="ord-review-opt">Qty {line.qty} · {line.optStr}</div>
                  </div>
                  <span className="ord-review-price">{fmt(line.line)}</span>
                </div>
              ))}
            </div>
            <div className="ord-pickup-est">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A62B1C" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" />
              </svg>
              <div>
                <div className="ord-pickup-est-title">Ready for pickup in ~15 min</div>
                <div className="ord-pickup-est-addr">5717 Gunn Hwy, Tampa, FL</div>
              </div>
            </div>
          </>
        )}

        {/* STEP 1: PICKUP DETAILS */}
        {step === 1 && (
          <>
            <div className="ord-fulfill-toggle">
              <button
                className="ord-fulfill-btn"
                onClick={() => onSetMode('pickup')}
                style={{
                  borderColor: mode === 'pickup' ? '#A62B1C' : 'rgba(28,26,25,.12)',
                  background: mode === 'pickup' ? 'rgba(166,43,28,.06)' : '#fff',
                  color: mode === 'pickup' ? '#A62B1C' : '#5b524a',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
                  <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                </svg>
                <span>Pickup</span>
                <small>15–20 min</small>
              </button>
              <button
                className="ord-fulfill-btn"
                onClick={() => onSetMode('delivery')}
                style={{
                  borderColor: mode === 'delivery' ? '#A62B1C' : 'rgba(28,26,25,.12)',
                  background: mode === 'delivery' ? 'rgba(166,43,28,.06)' : '#fff',
                  color: mode === 'delivery' ? '#A62B1C' : '#5b524a',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 13h11V6H3zM14 9h4l3 3v3h-7zM7 18a2 2 0 1 0 0-.01M18 18a2 2 0 1 0 0-.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Delivery</span>
                <small>30–40 min</small>
              </button>
            </div>

            <div className="ord-fulfill-label">{mode === 'pickup' ? 'Pickup Location' : 'Delivery Address'}</div>
            <div className="ord-location-card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A62B1C" strokeWidth="2">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" strokeLinejoin="round" />
              </svg>
              <div className="ord-location-info">
                <div className="ord-location-name">{mode === 'pickup' ? 'Isekai Sushi & Cafe' : 'Home'}</div>
                <div className="ord-location-addr">{mode === 'pickup' ? '5717 Gunn Hwy, Tampa, FL' : '4120 Oak Park Ln, Tampa, FL'}</div>
              </div>
              <span className="ord-location-change">Change</span>
            </div>

            <div className="ord-fulfill-label">When</div>
            <div className="ord-when-toggle">
              <div className="ord-when-btn ord-when-btn--active">
                <div>ASAP</div><div className="ord-when-sub">~15 min</div>
              </div>
              <div className="ord-when-btn">
                <div>Schedule</div><div className="ord-when-sub">Pick a time</div>
              </div>
            </div>

            <div className="ord-fulfill-label">Contact</div>
            <div className="ord-contact-fields">
              <div className="ord-contact-field">Alex Tanaka</div>
              <div className="ord-contact-field">(813) 555·0192</div>
            </div>
          </>
        )}

        {/* STEP 2: PAYMENT */}
        {step === 2 && (
          <>
            <div className="ord-fulfill-label">Payment Method</div>
            <div className="ord-card-visual">
              <div className="ord-card-visual-glow" />
              <div className="ord-card-visual-top">
                <span className="ord-card-type">VISA · DEBIT</span>
                <span className="ord-card-chip" />
              </div>
              <div className="ord-card-number">•••• •••• •••• 4827</div>
              <div className="ord-card-bottom">
                <span>Alex Tanaka</span><span>09 / 28</span>
              </div>
            </div>

            <div className="ord-fulfill-label">Add a tip</div>
            <div className="ord-tip-opts">
              {TIPS.map(t => (
                <button
                  key={t.label}
                  className="ord-tip-btn"
                  onClick={() => onSetTip(t.val)}
                  style={tip === t.val
                    ? { background: '#1C1A19', color: '#fff', borderColor: '#1C1A19' }
                    : undefined}
                >{t.label}</button>
              ))}
            </div>
          </>
        )}

        {/* TOTALS (always visible) */}
        <div className="ord-totals">
          <div className="ord-summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className="ord-summary-row"><span>Tax</span><span>{fmt(tax)}</span></div>
          {step === 2 && <div className="ord-summary-row"><span>Tip</span><span>{fmt(tipAmt)}</span></div>}
          <div className="ord-summary-row ord-summary-total"><span>Total</span><span>{fmt(step === 2 ? grand : subtotal + tax)}</span></div>
        </div>

        <div style={{ height: '16px' }} />
      </div>

      {/* FOOTER */}
      <div className="ord-panel-footer">
        <button className="ord-primary-btn" onClick={handlePrimary}>
          {primaryLabel} <span className="ord-btn-arrow">›</span>
        </button>
      </div>
    </div>
  )
}
