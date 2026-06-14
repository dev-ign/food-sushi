import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const TILES = [
  {
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=85',
    tag: '#sushi',
  },
  {
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=700&q=85',
    tag: '#boba',
  },
  {
    image: '/visit-photo.webp',
    tag: '#isekaisushi',
  },
  {
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85',
    tag: '#tampalife',
  },
  {
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=700&q=85',
    tag: '#freshsushi',
  },
  {
    image: '/catering-deluxe-platter.png',
    tag: '#isekaisushi',
  },
]

export default function SocialFollow() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { stagger: 0.07, y: 28 })

  return (
    <section className="instagram" ref={ref}>
      <div className="site-container">
        <div className="instagram-header">
          <div>
            <p className="instagram-eyebrow" data-reveal>Stay Connected</p>
            <h2 className="instagram-handle" data-reveal>@isekaisushicafe</h2>
          </div>
          <a
            href="https://www.instagram.com/isekaisushicafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-follow"
            data-reveal
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="instagram-grid">
          {TILES.map((tile, i) => (
            <a
              key={i}
              href="https://www.instagram.com/isekaisushicafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile"
              data-reveal
            >
              <img className="instagram-tile-img" src={tile.image} alt={`${tile.tag} at Isekai Sushi & Cafe`} loading="lazy" />
              <div className="instagram-tile-overlay">
                <span className="instagram-tile-tag">{tile.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
