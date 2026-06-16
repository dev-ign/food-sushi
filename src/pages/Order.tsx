import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MENU } from '../components/order/data'
import type { CartEntry } from '../components/order/data'
import MenuView from '../components/order/MenuView'
import CartView from '../components/order/CartView'
import CheckoutView from '../components/order/CheckoutView'
import TrackerView from '../components/order/TrackerView'
import ProductModal from '../components/order/ProductModal'
import { getLenis } from '../lib/lenis'

type FulfillMode = 'pickup' | 'delivery'

export default function Order() {
  const [viewIdx, setViewIdx] = useState(0)
  const [cart, setCart] = useState<CartEntry[]>([])
  const [activeCat, setActiveCat] = useState('Popular')
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const [modalQty, setModalQty] = useState(1)
  const [modalSpice, setModalSpice] = useState('Medium')
  const [modalAddons, setModalAddons] = useState<string[]>([])
  const [mode, setMode] = useState<FulfillMode>('pickup')
  const [step, setStep] = useState(0)
  const [tip, setTip] = useState(0.15)
  const [trackStatus, setTrackStatus] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  const trackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (trackTimerRef.current) clearInterval(trackTimerRef.current)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
  }, [])

  const startTracking = useCallback(() => {
    setTrackStatus(0)
    if (trackTimerRef.current) clearInterval(trackTimerRef.current)
    trackTimerRef.current = setInterval(() => {
      setTrackStatus(s => {
        if (s >= 3) { clearInterval(trackTimerRef.current!); return s }
        return s + 1
      })
    }, 3400)
  }, [])

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast(msg)
    toastTimerRef.current = setTimeout(() => setToast(null), 1900)
  }, [])

  const addToCart = useCallback((id: string, qty = 1) => {
    const item = MENU.find(m => m.id === id)
    setCart(prev => {
      const existing = prev.find(c => c.id === id)
      return existing
        ? prev.map(c => c.id === id ? { ...c, qty: c.qty + qty } : c)
        : [...prev, { id, qty }]
    })
    showToast('Added ' + (item?.name ?? 'item') + ' to order')
  }, [showToast])

  const changeQty = useCallback((id: string, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0)
    )
  }, [])

  const openModal = useCallback((id: string) => {
    setOpenItemId(id)
    setModalQty(1)
    setModalSpice('Medium')
    setModalAddons([])
  }, [])

  const closeModal = useCallback(() => setOpenItemId(null), [])

  const addModalToCart = useCallback(() => {
    if (!openItemId) return
    addToCart(openItemId, modalQty)
    setOpenItemId(null)
  }, [openItemId, modalQty, addToCart])

  const toggleAddon = useCallback((id: string) => {
    setModalAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }, [])

  const goToView = useCallback((idx: number) => {
    setViewIdx(idx)
    getLenis()?.scrollTo(0, { immediate: true })
  }, [])

  const handleNextStep = useCallback(() => setStep(s => Math.min(2, s + 1)), [])

  const handlePrevStep = useCallback(() => {
    if (step === 0) {
      setViewIdx(1) // back to cart
    } else {
      setStep(s => s - 1)
    }
  }, [step])

  const handlePlaceOrder = useCallback(() => {
    startTracking()
    setViewIdx(3)
    getLenis()?.scrollTo(0, { immediate: true })
  }, [startTracking])

  const handleRestart = useCallback(() => {
    setViewIdx(0)
    setStep(0)
    startTracking()
    getLenis()?.scrollTo(0, { immediate: true })
  }, [startTracking])

  const isTracker = viewIdx === 3

  return (
    <div className={`ord-page ${isTracker ? 'ord-page--dark' : ''}`}>
      <div className="ord-shell">
        {/* TOP NAV - back to site, only on menu view */}
        {viewIdx === 0 && (
          <div className="ord-site-nav">
            <Link to="/" className="ord-site-back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to site
            </Link>
            <img src="/logo.webp" alt="Isekai" className="ord-site-logo" />
          </div>
        )}

        {/* VIEW SLIDER */}
        <div
          className="ord-track"
          style={viewIdx === 0 ? undefined : { transform: `translateX(-${viewIdx * 25}%)` }}
        >
          <div className="ord-view">
            <MenuView
              cart={cart}
              activeCat={activeCat}
              onCatChange={setActiveCat}
              onOpenItem={openModal}
              onAddItem={addToCart}
              onGoCart={() => goToView(1)}
            />
          </div>

          <div className="ord-view">
            <CartView
              cart={cart}
              onChangeQty={changeQty}
              onAddItem={addToCart}
              onBack={() => goToView(0)}
              onGoCheckout={() => goToView(2)}
            />
          </div>

          <div className="ord-view">
            <CheckoutView
              cart={cart}
              step={step}
              mode={mode}
              tip={tip}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onSetMode={setMode}
              onSetTip={setTip}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>

          <div className="ord-view ord-view--dark">
            <TrackerView
              trackStatus={trackStatus}
              onRestart={handleRestart}
            />
          </div>
        </div>

        {/* MODAL */}
        <ProductModal
          itemId={openItemId}
          qty={modalQty}
          spice={modalSpice}
          addons={modalAddons}
          onClose={closeModal}
          onIncQty={() => setModalQty(q => q + 1)}
          onDecQty={() => setModalQty(q => Math.max(1, q - 1))}
          onToggleSpice={setModalSpice}
          onToggleAddon={toggleAddon}
          onAdd={addModalToCart}
          onAddPairing={(id) => { addToCart(id); }}
        />

        {/* TOAST */}
        {toast && (
          <div className="ord-toast" key={toast}>
            <span className="ord-toast-check">✓</span> {toast}
          </div>
        )}
      </div>
    </div>
  )
}
