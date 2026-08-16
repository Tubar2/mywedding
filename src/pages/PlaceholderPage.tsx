import './PlaceholderPage.css'

interface PlaceholderPageProps {
  title: string
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="placeholder">
      <h2 className="placeholder__title">{title}</h2>
      <p className="placeholder__text">Em breve...</p>
    </main>
  )
}

export default PlaceholderPage
