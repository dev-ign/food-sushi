import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function OrderCTA() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { y: 30, stagger: 0.1 })

  return (
    <section className="order-cta" ref={ref}>
      <div className="order-cta-inner">
        <h2 className="order-cta-title" data-reveal>
          Ready to Order?<br />
          We&rsquo;re Ready for You.
        </h2>
        <p className="order-cta-desc" data-reveal>
          Fresh sushi, boba, and Japanese street food — available for pickup and delivery today.
        </p>
        <div className="order-cta-actions" data-reveal>
          <a
            href="https://order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
          >
            Order Online Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/catering" className="btn-ghost-white">
            Book Catering
          </a>
        </div>
      </div>
    </section>
  )
}
