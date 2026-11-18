export type ProductCategory = 'Fashion' | 'Electronics' | 'Home' | 'Accessories'
export type ProductArtwork = 'headphones' | 'bag' | 'shoe' | 'lamp'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  artwork: ProductArtwork
  color: string
  background: string
}
