import Hero from '../components/sections/Hero'
import QuickLinks from '../components/sections/QuickLinks'
import CateringHighlight from '../components/sections/CateringHighlight'
import MenuExplorer from '../components/sections/MenuExplorer'
import VisitSection from '../components/sections/InteriorSection'
import SocialFollow from '../components/sections/SocialFollow'
import ReviewsSection from '../components/sections/ReviewsSection'
import OrderCTA from '../components/sections/OrderCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <MenuExplorer />
      <CateringHighlight />
      <VisitSection />
      <SocialFollow />
      <ReviewsSection />
      <OrderCTA />
    </main>
  )
}
