import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function VisitSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { y: 36, stagger: 0.1 })

  return (
    <section className="visit" ref={ref} id="visit">
      <div className="visit-grid site-container">
        <div className="visit-photo" data-reveal>
          <img className="visit-photo-img" src="/visit-photo.webp" alt="Inside Isekai Sushi & Cafe in Citrus Park, Tampa" />
          <div className="visit-photo-shade" />
          <div className="visit-photo-frame" />
          <div className="visit-photo-caption">
            <p className="visit-photo-tag">◎ Our Space</p>
            <p className="visit-photo-label">Citrus Park, Tampa</p>
          </div>
        </div>

        <div data-reveal>
          <p className="visit-eyebrow">Come Say Hello</p>
          <h2 className="visit-title">
            Visit Us in<br />Tampa, FL
          </h2>

          <address className="visit-address" style={{ fontStyle: 'normal' }}>
            Citrus Park Town Center<br />
            5717 Gunn Hwy<br />
            Tampa, FL 33625
          </address>

          <div className="visit-hours">
            <div className="visit-hours-row">
              <span className="visit-hours-day">Mon – Thu</span>
              <span className="visit-hours-time">11:00 am – 9:00 pm</span>
            </div>
            <div className="visit-hours-row">
              <span className="visit-hours-day">Fri – Sat</span>
              <span className="visit-hours-time">11:00 am – 9:00 pm</span>
            </div>
            <div className="visit-hours-row">
              <span className="visit-hours-day">Sunday</span>
              <span className="visit-hours-time" style={{ color: '#A62B1C' }}>Closed</span>
            </div>
          </div>

          <div className="visit-actions">
            <a
              href="https://maps.google.com/?q=5717+Gunn+Hwy+Tampa+FL+33625"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              Get Directions
            </a>
            <a
              href="tel:+18133770977"
              className="btn-ghost-dark"
            >
              (813) 377-0977
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
