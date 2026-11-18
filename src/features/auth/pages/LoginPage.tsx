import LoginForm from "../components/LoginForm"
import './LoginPage.css'
import { Link } from 'react-router'

export default function LoginPage() {
    return (
        <main className="login-page">
            <section
                className="login-card"
                aria-labelledby="login-heading"
            >
                <p className="brand">TRENDORA</p>

                <h1 id="login-heading">Welcome back</h1>

                <p className="login-description">
                Sign in to continue your shopping journey.
                </p>

                <LoginForm />
                <Link to="/">← Continue browsing without signing in</Link>
            </section>
        </main>
    )
}
