import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlight'
import Model from './components/Model'
import Features from './components/Features'
import Chip from './components/Chip'
import Footer from './components/Footer'

const App = ():ReactNode=> {
  return (
    <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <Chip />
      <Footer />
    </main>
  )
}

export default App
