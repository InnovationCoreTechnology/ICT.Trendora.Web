import { Link, Route, Routes } from 'react-router'
import StoreLayout from './layouts/StoreLayout'
import HomePage from '../features/storefront/pages/HomePage'
import LoginPage from '../features/auth/pages/LoginPage'
import { mockProducts } from '../mocks/data/products'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage products={mockProducts} />} />
        <Route path="cart" element={<main id="main-content" className="store-container placeholder-page" tabIndex={-1}><p className="eyebrow">COMING IN A LATER PHASE</p><h1>Your cart starts here.</h1><p>This prototype is for browsing. Adding items and checkout are not implemented yet.</p><Link to="/">Continue exploring →</Link></main>} />
        <Route path="*" element={<main id="main-content" className="store-container placeholder-page" tabIndex={-1}><h1>We couldn’t find that page.</h1><p>There are still plenty of good finds on the homepage.</p><Link to="/">Back to the storefront →</Link></main>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}
