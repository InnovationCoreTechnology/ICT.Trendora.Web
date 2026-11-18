import { Link } from 'react-router'

export default function StoreFooter() {
  return (
    <footer className="store-footer">
      <div className="store-container footer-content">
        <div><Link className="store-logo" to="/">trendora<span>.</span></Link><p>A little discovery. Every day.</p></div>
        <p>Demo storefront · Fictional products and prices.<br />No purchases or real sign-in are available.</p>
        <Link to="/login">Explore the login preview →</Link>
      </div>
    </footer>
  )
}
