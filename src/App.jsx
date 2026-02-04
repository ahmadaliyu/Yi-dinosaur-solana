import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Token from './components/Token'
import Community from './components/Community'
import Partners from './components/Partners'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="grid-bg"></div>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Token />
        <Community />
        <Partners />
      </main>
      <Footer />
    </div>
  )
}

export default App
