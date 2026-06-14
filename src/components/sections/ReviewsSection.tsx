import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const REVIEWS = [
  {
    name: 'Daniel D.',
    avatar: 'DD',
    avatarColor: '#4285F4',
    location: 'Tampa, FL · Google Review',
    stars: 5,
    text: 'Best sushi in Tampa, hands down. The Internal Combustion Roll is a must-try — super fresh, incredible flavors. The staff is always welcoming and the vibe is perfect.',
  },
  {
    name: 'Silvia M.',
    avatar: 'SM',
    avatarColor: '#34A853',
    location: 'Tampa, FL · Google Review',
    stars: 5,
    text: 'Honestly love this place. It\'s super clean, the food is to die for, and the staff is so friendly. The boba is the best I\'ve had in the Tampa area. Obsessed!',
  },
  {
    name: 'Gus R.',
    avatar: 'GR',
    avatarColor: '#EA4335',
    location: 'Tampa, FL · Google Review',
    stars: 5,
    text: 'This place is incredible! Fresh sushi made to order, amazing boba, and the catering platters for my office were a huge hit. Everyone was asking where I ordered from.',
  },
]

export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { stagger: 0.12, y: 35 })

  return (
    <section className="reviews" ref={ref} id="reviews">
      <div className="site-container">
        <div className="reviews-header">
          <h2 className="reviews-title" data-reveal>
            Don&rsquo;t Take Our<br />Word For It
          </h2>
          <div className="reviews-badge" data-reveal>
            <div className="reviews-badge-icon">G</div>
            <div className="reviews-badge-score">4.9</div>
            <div className="reviews-badge-stars">★★★★★</div>
            <div className="reviews-badge-sep" />
            <span className="reviews-badge-count">950+ Google Reviews</span>
          </div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <article key={r.name} className="review-card" data-reveal>
              <div className="review-stars">{'★'.repeat(r.stars)}</div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-author">
                <div
                  className="review-avatar"
                  style={{ background: r.avatarColor }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-location">{r.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="reviews-footer" data-reveal>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Isekai+Sushi+Cafe+Tampa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-white"
          >
            Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
