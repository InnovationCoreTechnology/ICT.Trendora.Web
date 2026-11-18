import { Link, useNavigate, useSearchParams } from 'react-router'
import type { FormEvent } from 'react'

export default function StoreHeader() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    const next = new URLSearchParams(params)
    if (query) next.set('q', query)
    else next.delete('q')
    navigate({ pathname: '/', search: next.toString() })
  }

  return (
    <header className="store-header">
      <div className="store-container header-content">
        <Link to="/" className="store-logo" aria-label="Trendora home">trendora<span>.</span></Link>
        <form key={params.get('q') ?? ''} className="store-search" role="search" onSubmit={search}>
          <label className="visually-hidden" htmlFor="catalog-search">Search products</label>
          <input id="catalog-search" name="q" type="search" placeholder="Find your next favourite thing" defaultValue={params.get('q') ?? ''} />
          <button type="submit" aria-label="Search products">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          </button>
        </form>
        <nav className="header-actions" aria-label="Account and cart">
          <Link to="/login">Sign in <span aria-hidden="true">↗</span></Link>
          <Link to="/cart" className="cart-link">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h2l3 12h11l2-8H6M10 20h.01M18 20h.01" /></svg>
            Cart
          </Link>
        </nav>
      </div>
    </header>
  )
}
