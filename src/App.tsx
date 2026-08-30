import DemoOne from './demo'
import './App.css'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import About from './components/sections/About'
import Education from './components/sections/Education'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Certifications from './components/sections/Certifications'
import Blogs from './components/sections/Blogs'
import Protosem from './components/sections/Protosem'
import Footer from './components/Footer'

function App() {
  return (
    <div className="w-full text-white font-sans">
      <AmbientBackground />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full h-screen relative">
        <DemoOne />
      </div>

      <div className="relative z-10">
        <About />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Blogs />
        <Protosem />
      </div>

      <Footer />
    </div>
  )
}

export default App
