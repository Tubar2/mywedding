import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Informacoes from './pages/Informacoes'
import Presentes from './pages/Presentes'
import Recados from './pages/Recados'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/recados" element={<Recados />} />
      </Routes>
    </HashRouter>
  )
}

export default App
