import { useSearchParams } from 'react-router'

const categories = ['All finds', 'Fashion', 'Electronics', 'Home', 'Accessories']

export default function CategoryNav() {
  const [params, setParams] = useSearchParams()
  const selected = params.get('category') ?? ''

  return (
    <nav className="category-nav" aria-label="Product categories">
      <div className="store-container category-content">
        {categories.map((category, index) => {
          const value = index === 0 ? '' : category
          return (
            <button key={category} type="button" aria-pressed={selected === value} onClick={() => {
              const next = new URLSearchParams(params)
              if (value) next.set('category', value)
              else next.delete('category')
              setParams(next)
            }}>{category}</button>
          )
        })}
        <span className="category-note">Good finds. Everyday.</span>
      </div>
    </nav>
  )
}
