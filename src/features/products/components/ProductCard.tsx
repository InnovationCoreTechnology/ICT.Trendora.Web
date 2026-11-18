import type { Product } from '../product.types'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import ProductArtwork from './ProductArtwork'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-artwork" style={{ background: product.background }}>
        <ProductArtwork kind={product.artwork} color={product.color} />
      </div>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{formatCurrency(product.price)} <span>sample price</span></p>
      </div>
    </article>
  )
}
