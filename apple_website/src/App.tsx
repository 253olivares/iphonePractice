import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlight'
import Model from './components/Model'

const App = ():ReactNode=> {
  return (
    <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  )
}

export default App
