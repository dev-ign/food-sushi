import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

function HeroCinematic() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const phrases = gsap.utils.toArray<HTMLElement>('.h1-phrase')

    gsap.set(phrases, { autoAlpha: 0, yPercent: 65 })
    gsap.set(phrases[0], { autoAlpha: 1, yPercent: 0 })

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h1-eyebrow', { opacity: 0, y: 18, duration: 0.7 })
      .from('.h1-title',   { opacity: 0, y: 46, duration: 0.9 }, '-=0.4')
      .from('.h1-sub',     { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
      .from('.h1-actions', { opacity: 0, y: 18, duration: 0.6 }, '-=0.4')
      .from('.h1-badge',   { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')

    const phraseTimeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '+=220%',
        scrub: 0.55,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    phraseTimeline
      .to(phrases[0], { autoAlpha: 0, yPercent: -70, duration: 0.35 }, 0)
      .to(phrases[1], { autoAlpha: 1, yPercent: 0, duration: 0.35 }, 0.12)
      .to(phrases[1], { autoAlpha: 0, yPercent: -70, duration: 0.35 }, 0.78)
      .to(phrases[2], { autoAlpha: 1, yPercent: 0, duration: 0.35 }, 0.9)
      .to({}, { duration: 0.35 })

    ScrollTrigger.refresh()
  }, { scope: ref })

  return (
    <section className="hero-1" ref={ref}>
      {/* Video panel — right side, bleeds left under text column */}
      <div className="hero-1-video-wrap">
        <video
          className="hero-1-video"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-1-video-dark" />
        <div className="hero-1-video-vignette" />
      </div>

      {/* Dark gradient on left — keeps text legible */}
      <div className="hero-1-left-gradient" />

      {/* Film grain over everything */}
      <div className="hero-1-grain" />

      <div className="hero-1-content">
        <p className="hero-eyebrow h1-eyebrow">Fresh Made Daily · Citrus Park, Tampa FL</p>

        <h1 className="hero-1-title h1-title">
          <span className="h1-phrase">Fresh <span className="hero-title-gradient">Sushi.</span></span>
          <span className="h1-phrase"><span className="hero-title-gradient">Boba</span> Drinks.</span>
          <span className="h1-phrase">Asian <span className="hero-title-gradient">Street Food.</span></span>
        </h1>

        <p className="hero-subtitle h1-sub">
          Inspired by the street food of Asia. Fresh sushi rolls, boba milk teas,
          and small Japanese bites, all made with homemade recipes.
        </p>

        <div className="hero-actions h1-actions">
          <a
            href="https://order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
          >
            Order Online
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/menu" className="btn-ghost-light">View Menu</a>
          <a href="/catering" className="btn-text-gold">
            Book Catering
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="google-badge h1-badge">
          <svg className="google-badge-icon" viewBox="0 0 24 24" aria-label="Google" role="img">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z" />
          </svg>
          <div className="google-badge-stars">★★★★★</div>
          <span className="google-badge-score" style={{ color: '#F7F1E7' }}>4.9</span>
          <div className="google-badge-sep" />
          <span className="google-badge-count">950+ reviews</span>
        </div>
      </div>
    </section>
  )
}

function HeroEditorial() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h2-eyebrow', { opacity: 0, y: 14, duration: 0.6 })
      .from('.h2-title',   { opacity: 0, y: 40, duration: 0.85 }, '-=0.3')
      .from('.h2-rule',    { scaleX: 0, transformOrigin: 'left', duration: 0.5 }, '-=0.4')
      .from('.h2-sub',     { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.h2-actions', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.hero-2-right', { opacity: 0, x: 40, duration: 1 }, '<-=0.6')
  }, { scope: ref })

  return (
    <section className="hero-2 active" ref={ref}>
      <div className="hero-2-left">
        <p className="hero-2-eyebrow h2-eyebrow">Fresh Made Daily · Tampa, FL</p>

        <h1 className="hero-2-title h2-title">
          Sushi &amp;<br />
          Street Food<br />
          Elevated.
        </h1>

        <div className="hero-2-rule h2-rule" />

        <p className="hero-2-subtitle h2-sub">
          Signature rolls, nigiri, boba, and Japanese street bites — crafted daily
          in our kitchen at Citrus Park Town Center.
        </p>

        <div className="hero-actions h2-actions">
          <a
            href="https://order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
          >
            Order Online
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/menu" className="btn-ghost-dark">View Menu</a>
        </div>
      </div>

      <div className="hero-2-right">
        <div className="hero-2-right-bg" />
        <div className="hero-2-frame" />
        <div className="hero-2-caption">
          <p className="hero-2-caption-tag">◎ Signature Roll</p>
          <p className="hero-2-caption-label">Dragon Roll</p>
        </div>
      </div>
    </section>
  )
}

function HeroStacked() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h3-eyebrow', { opacity: 0, y: 14, duration: 0.6 })
      .from('.h3-title',   { opacity: 0, y: 50, duration: 0.95 }, '-=0.3')
      .from('.h3-sub',     { opacity: 0, y: 22, duration: 0.65 }, '-=0.45')
      .from('.h3-actions', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.hero-3-panel', { opacity: 0, y: 36, duration: 0.8, ease: 'power2.out' }, '-=0.2')
  }, { scope: ref })

  return (
    <div className="hero-3 active" ref={ref}>
      <div className="hero-3-inner">
        <p className="hero-3-eyebrow h3-eyebrow">Fresh Made Daily · Citrus Park, Tampa FL</p>

        <h1 className="hero-3-title h3-title">
          Fresh Sushi.<br />
          Boba. Asian<br />
          Street Food.
        </h1>

        <p className="hero-3-subtitle h3-sub">
          Small plates, big flavors — inspired by the street food of Asia.
        </p>

        <div className="hero-actions h3-actions" style={{ justifyContent: 'center', marginBottom: '48px' }}>
          <a
            href="https://order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
          >
            Order Online
          </a>
          <a href="/menu" className="btn-ghost-dark">View Menu</a>
        </div>

        <div className="hero-3-panel">
          <div className="hero-3-panel-bg" />
          <div className="hero-3-panel-fade" />
          <div className="hero-3-panel-caption">
            <p className="hero-3-panel-caption-tag">◎ Today's Special</p>
            <p className="hero-3-panel-caption-label">Signature Rolls & Boba</p>
          </div>
          <div className="hero-3-rating">
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#F2C94C' }}>4.9</div>
            <div style={{ fontSize: '12px', color: '#F2C94C', letterSpacing: '2px' }}>★★★★★</div>
            <div style={{ fontSize: '11px', color: 'rgba(247,241,231,.75)', marginTop: '2px' }}>Google</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HERO_VARIANTS = [
  { key: 1, label: 'Cinematic', Component: HeroCinematic },
  { key: 2, label: 'Editorial', Component: HeroEditorial },
  { key: 3, label: 'Stacked',   Component: HeroStacked },
]

export default function Hero() {
  const [active] = useState(1)
  const ActiveHero = HERO_VARIANTS.find((v) => v.key === active)!.Component

  return (
    <>
      <ActiveHero />
    </>
  )
}
