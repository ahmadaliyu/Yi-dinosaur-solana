import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Token from './components/Token'
import WalletTracker from './components/WalletTracker'
import RugScanner from './components/RugScanner'
import Community from './components/Community'
import Partners from './components/Partners'
import Footer from './components/Footer'
import './App.css'

// Page components
const HomePage = () => (
  <main>
    <Hero />
    <Stats />
    <Token />
    <WalletTracker />
    <Community />
    <Partners />
  </main>
)

const StatsPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <Stats />
    </div>
  </main>
)

const TokenPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <Token />
    </div>
  </main>
)

const TrackerPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <WalletTracker />
    </div>
  </main>
)

const ScannerPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <RugScanner />
    </div>
  </main>
)

const CommunityPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <Community />
    </div>
  </main>
)

const PartnersPage = () => (
  <main>
    <div style={{ paddingTop: '100px' }}>
      <Partners />
    </div>
  </main>
)

function App() {
  return (
    <Router>
      <div className="app">
        <div className="grid-bg"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/partners" element={<PartnersPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
