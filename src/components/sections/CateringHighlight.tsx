import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const PACKAGES = [
  {
    name: 'Classic',
    price: '$95',
    desc: 'Perfect for small gatherings & office lunches.',
    badge: null,
    preview: 'Small platter',
    image: '/catering-classic-platter.png',
    items: [
      '40 pieces total',
      '4 signature rolls of your choice',
      'Soy sauce, wasabi & ginger',
      'Eco-friendly packaging',
    ],
  },
  {
    name: 'Deluxe',
    price: '$130',
    desc: 'Our most popular — great for parties & events.',
    badge: 'Most Popular',
    preview: 'Medium platter',
    image: '/catering-deluxe-platter.png',
    items: [
      '60 pieces total',
      '6 signature rolls of your choice',
      'Nigiri selection included',
      'Full condiment set',
      'Premium eco-friendly packaging',
    ],
  },
  {
    name: 'Premium',
    price: '$160',
    desc: 'The full experience for larger celebrations.',
    badge: null,
    preview: 'Huge celebration platter',
    image: '/catering-premium-platter.png',
    items: [
      '80 pieces total',
      '8 signature rolls of your choice',
      'Nigiri & sashimi selection',
      'Miso soup included',
      'Full condiment set',
      'Premium eco-friendly packaging',
    ],
  },
]

export default function CateringHighlight() {
  const ref = useRef<HTMLElement>(null)

  useScrollReveal(ref, { y: 40, stagger: 0.1 })

  return (
    <section className="catering" ref={ref}>
      <div className="site-container">
        <div className="catering-split">
          <div data-reveal>
            <p className="catering-eyebrow">Catering & Events</p>
            <h2 className="catering-title">
              Fresh Sushi for<br />Your Next Event
            </h2>
            <p className="catering-kicker">
              One of Tampa's favorite sushi catering experiences.
            </p>
            <p className="catering-desc">
              From office lunches to celebrations, our sushi platters arrive fresh,
              beautifully arranged, and ready to impress. Vegetarian options and
              cooked selections available. Pickup or limited delivery.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="/catering" className="btn-red">
                View All Packages
              </a>
              <a href="/contact" className="btn-ghost-light">
                Request a Quote
              </a>
            </div>
          </div>

          <div className="catering-photo" data-reveal>
            {PACKAGES.map((pkg) => (
              <img
                key={pkg.name}
                className={`catering-photo-img catering-photo-img-${pkg.name.toLowerCase()}${pkg.name === 'Deluxe' ? ' active' : ''}`}
                src={pkg.image}
                alt={`${pkg.name} sushi catering ${pkg.preview}`}
              />
            ))}
            <div className="catering-photo-shade" />
            <div className="catering-photo-frame" />
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`catering-photo-caption catering-photo-caption-${pkg.name.toLowerCase()}${pkg.name === 'Deluxe' ? ' active' : ''}`}
              >
                <p className="catering-photo-tag">◎ {pkg.preview}</p>
                <p className="catering-photo-label">{pkg.name} Selection</p>
              </div>
            ))}
          </div>
        </div>

        <div className="catering-packages">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`catering-pkg${pkg.name === 'Deluxe' ? ' active' : ''}`}
              tabIndex={0}
              data-package-name={pkg.name}
              data-reveal
            >
              {pkg.badge && (
                <span className="catering-pkg-badge">{pkg.badge}</span>
              )}
              <p className="catering-pkg-name">{pkg.name}</p>
              <p className="catering-pkg-price">{pkg.price}<span style={{ fontSize: '16px', color: 'rgba(247,241,231,.6)' }}> / platter</span></p>
              <p className="catering-pkg-desc">{pkg.desc}</p>
              <div className="catering-pkg-divider" />
              <div className="catering-pkg-items">
                {pkg.items.map((item) => (
                  <div key={item} className="catering-pkg-item">
                    <span className="catering-pkg-bullet">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="catering-footnote" data-reveal>
          48-hour advance notice required · Minimum order applies · Contact us for custom packages
        </p>
      </div>
    </section>
  )
}
