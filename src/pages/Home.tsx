import Countdown from '../components/Countdown'
import capaSite from '../assets/images/capa-site.png'
import './Home.css'

const WEDDING_DATE = new Date('2026-10-31T16:00:00-03:00')

function Home() {
  return (
    <main className="home">
      <section
        className="home__hero"
        style={{ backgroundImage: `url(${capaSite})` }}
      >
        <div className="home__hero-content">
          <h1 className="home__names">Laiana &amp; Ricardo</h1>
          <p className="home__date">31 de Outubro de 2026</p>
          <Countdown targetDate={WEDDING_DATE} />
        </div>
      </section>
    </main>
  )
}

export default Home
