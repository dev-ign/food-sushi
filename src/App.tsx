import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Order from './pages/Order'

function ComingSoon({ title }: { title: string }) {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2rem', marginBottom: '0.75rem', color: '#1C1A19' }}>{title}</h1>
        <p style={{ color: '#7a716a' }}>This page is coming soon.</p>
      </div>
    </main>
  )
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<Order />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<ComingSoon title="Menu & Order Online" />} />
          <Route path="/catering" element={<ComingSoon title="Catering & Classes" />} />
          <Route path="/classes" element={<ComingSoon title="Sushi Classes" />} />
          <Route path="/gift-cards" element={<ComingSoon title="Gift Cards" />} />
          <Route path="/about" element={<ComingSoon title="About Isekai" />} />
          <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
          <Route path="/careers" element={<ComingSoon title="Careers" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
