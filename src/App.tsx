import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import NossaHistoria from './pages/NossaHistoria'
import Fotos from './pages/Fotos'
import Informacoes from './pages/Informacoes'
import DicasDeEstadia from './pages/DicasDeEstadia'
import Presentes from './pages/Presentes'
import Recados from './pages/Recados'
import Rsvp from './pages/Rsvp'
import Admin from './pages/Admin'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<NossaHistoria />} />
        <Route path="/fotos" element={<Fotos />} />
        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/estadia" element={<DicasDeEstadia />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/recados" element={<Recados />} />
        <Route path="/rsvp/:codigo" element={<Rsvp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  )
}

export default App
