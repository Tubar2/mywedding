import Countdown from '../components/Countdown'
import FloresMobile from '../components/FloresMobile'
import logoLR from '../assets/images/logo-LR.svg'
import flowerBackground from '../assets/images/flower-background.webp'
import './Home.css'

const WEDDING_DATE = new Date('2026-10-31T16:00:00-03:00')

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <img className="home__logo" src={logoLR} alt="Laiana & Ricardo" />
          <h1 className="home__names">Laiana &amp; Ricardo</h1>
          <p className="home__date">31 de Outubro de 2026</p>
          <Countdown targetDate={WEDDING_DATE} />
        </div>
        <FloresMobile />
        <img
          className="home__flowers"
          src={flowerBackground}
          alt=""
          aria-hidden="true"
        />
      </section>
    </main>
  )
}

export default Home
