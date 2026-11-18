import {useState} from "react"
import type {FormEvent} from "react"
import Button from "../../../shared/components/ui/Button"
import TextField from "../../../shared/components/forms/TextField"

export default function LoginForm() {
    const [message, setMessage] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setMessage(
            'Form validation passed. This preview does not sign you in.'
          )
    }
    
    return (
        <form
      className="login-form"
      onSubmit={handleSubmit}
      onChange={() => setMessage('')}
      aria-describedby="login-demo-note"
    >
      <TextField
        id="login-email"
        label="Email address"
        name="email"
        type="email"
        autoComplete="username"
        placeholder="you@example.com"
        required
      />

      <TextField
        id="login-password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      <Button type="submit">Preview sign-in</Button>

      <p id="login-demo-note" className="muted">
        Demo only. Use sample details, not your real password.
      </p>

      <p className="form-status" role="status">
        {message}
      </p>
    </form>
    )
}