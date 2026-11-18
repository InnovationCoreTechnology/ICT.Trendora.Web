import type { Product } from '../../features/products/product.types'

// Fictional catalogue for UI development. Prices are not real offers.
export const mockProducts: readonly Product[] = [
  { id: 'audio-01', name: 'Everyday wireless headphones', category: 'Electronics', price: 2499, description: 'A little more music in your day.', artwork: 'headphones', color: '#473a78', background: '#ede8f8' },
  { id: 'bag-01', name: 'The daily carry tote', category: 'Accessories', price: 899, description: 'Room for all your everyday essentials.', artwork: 'bag', color: '#b66c3d', background: '#f5e9db' },
  { id: 'shoe-01', name: 'Weekend everyday sneakers', category: 'Fashion', price: 1799, description: 'A fresh take on your daily rotation.', artwork: 'shoe', color: '#62846d', background: '#e6eee5' },
  { id: 'lamp-01', name: 'Soft glow desk lamp', category: 'Home', price: 1299, description: 'Give your favourite corner a glow.', artwork: 'lamp', color: '#b77e45', background: '#f8eedc' },
  { id: 'audio-02', name: 'Studio over-ear headphones', category: 'Electronics', price: 3299, description: 'Your soundtrack, your own space.', artwork: 'headphones', color: '#445a6a', background: '#e5edf2' },
  { id: 'bag-02', name: 'Everywhere canvas tote', category: 'Accessories', price: 699, description: 'An easy companion for busy days.', artwork: 'bag', color: '#667b54', background: '#eef0df' },
  { id: 'shoe-02', name: 'City walk sneakers', category: 'Fashion', price: 2199, description: 'Make everyday outfits your own.', artwork: 'shoe', color: '#bc745f', background: '#f6e7e2' },
  { id: 'lamp-02', name: 'Reading corner lamp', category: 'Home', price: 1599, description: 'A warm finishing touch for home.', artwork: 'lamp', color: '#687096', background: '#e9eaf4' },
]
