import flor1 from '../assets/images/flores-mobile/flor-9.webp'
import flor2 from '../assets/images/flores-mobile/flor-6.webp'
import flor3 from '../assets/images/flores-mobile/flor-3.webp'
import flor4 from '../assets/images/flores-mobile/flor-2.webp'
import flor5 from '../assets/images/flores-mobile/flor-8.webp'
import flor6 from '../assets/images/flores-mobile/flor-5.webp'
import flor7 from '../assets/images/flores-mobile/flor-10.webp'
import flor8 from '../assets/images/flores-mobile/flor-7.webp'
import './FloresMobile.css'

function FloresMobile() {
  return (
    <div className="flores-mobile" aria-hidden="true">
      <img className="flores-mobile__item flores-mobile__spike-esquerda" src={flor1} alt="" />
      <img className="flores-mobile__item flores-mobile__spike-centro" src={flor2} alt="" />
      <img className="flores-mobile__item flores-mobile__spike-direita" src={flor3} alt="" />
      <img className="flores-mobile__item flores-mobile__cluster-esquerda" src={flor4} alt="" />
      <img className="flores-mobile__item flores-mobile__cluster-centro" src={flor5} alt="" />
      <img className="flores-mobile__item flores-mobile__cluster-amarela" src={flor6} alt="" />
      <img className="flores-mobile__item flores-mobile__cluster-direita" src={flor7} alt="" />
      <img className="flores-mobile__item flores-mobile__pompom" src={flor8} alt="" />
    </div>
  )
}

export default FloresMobile
