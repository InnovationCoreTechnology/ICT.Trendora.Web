import { Outlet, useLocation } from 'react-router'
import StoreHeader from '../../features/storefront/components/StoreHeader'
import CategoryNav from '../../features/storefront/components/CategoryNav'
import StoreFooter from '../../features/storefront/components/StoreFooter'
import './StoreLayout.css'

export default function StoreLayout() {
  const { pathname } = useLocation()
  return (
    <div className="store-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="demo-strip">A first look at Trendora <span>•</span> Browse freely. No sign-in needed.</div>
      <StoreHeader />
      {pathname === '/' && <CategoryNav />}
      <Outlet />
      <StoreFooter />
    </div>
  )
}
