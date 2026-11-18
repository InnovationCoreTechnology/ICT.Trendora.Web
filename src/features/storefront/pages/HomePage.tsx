import { Link, useSearchParams } from 'react-router'
import type { Product } from '../../products/product.types'
import ProductArtwork from '../../products/components/ProductArtwork'
import ProductCard from '../../products/components/ProductCard'
import './HomePage.css'

export default function HomePage({ products }: { products: readonly Product[] }) {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const category = params.get('category') ?? ''
  const filtered = products.filter(product =>
    (!category || product.category === category) &&
    `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase()),
  )
  const filtering = Boolean(query || category)

  return (
    <main id="main-content" className="store-container home-page" tabIndex={-1}>
      {!filtering && <>
        <section className="store-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">THE EVERYDAY EDIT</p>
            <h1 id="hero-title">Small finds.<br /><em>Big little joys.</em></h1>
            <p>Refresh your routine with a world of everyday favourites. Find something that feels like you.</p>
            <a className="hero-action" href="#products">Explore the collection <span aria-hidden="true">↗</span></a>
            <span className="hero-caption">A curated demo collection, made for exploring.</span>
          </div>
          <div className="hero-display" aria-hidden="true">
            <span className="hero-orbit" />
            <div className="hero-product"><ProductArtwork kind="headphones" color="#493879" /></div>
            <span className="hero-sticker">Your next<br /><strong>favourite.</strong></span>
            <span className="hero-product-label">Soundtrack your everyday</span>
          </div>
        </section>
        <div className="discovery-grid">
          <Link to="/?category=Fashion" className="discovery-tile fashion-tile"><div><span className="eyebrow">WEAR YOUR MOOD</span><h2>A fresh perspective.</h2><span>Explore fashion →</span></div><ProductArtwork kind="shoe" color="#54785f" /></Link>
          <Link to="/?category=Home" className="discovery-tile home-tile"><div><span className="eyebrow">MAKE ROOM FOR JOY</span><h2>A softer kind of home.</h2><span>Explore home →</span></div><ProductArtwork kind="lamp" color="#bb8550" /></Link>
        </div>
      </>}
      <section id="products" className="catalog-section" aria-labelledby="products-heading">
        <div className="section-heading">
          <div><p className="eyebrow">{filtering ? 'YOUR DISCOVERIES' : 'CURATED FOR YOUR EVERYDAY'}</p><h2 id="products-heading">{query ? `Results for “${query}”` : category || 'Find your new favourites'}</h2></div>
          <div className="catalog-meta"><span role="status">{filtered.length} sample {filtered.length === 1 ? 'product' : 'products'}</span>{filtering && <Link to="/">Clear filters</Link>}</div>
        </div>
        {filtered.length > 0 ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="catalog-empty"><h3>No finds just yet</h3><p>Try another search or clear your filters to see the full collection.</p><Link to="/">Browse all products →</Link></div>}
      </section>
    </main>
  )
}
