import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://internship-checker.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // JWT token temporarily store kar rahe hain
      sessionStorage.setItem("token", data.token);

      // User name bhi temporarily store
      sessionStorage.setItem("user", JSON.stringify(data.user));

      

      navigate("/dashboard");
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Background Decorations */}
      <div className="auth-circle auth-circle-left"></div>
      <div className="auth-circle auth-circle-right"></div>

      <div className="auth-ring auth-ring-left"></div>
      <div className="auth-ring auth-ring-right"></div>

      <div className="auth-dots auth-dots-left">
        • • • •
        <br />
        • • • •
        <br />
        • • • •
        <br />
        • • • •
      </div>

      <div className="auth-dots auth-dots-right">
        • • • •
        <br />
        • • • •
        <br />
        • • • •
        <br />
        • • • •
      </div>

      <div className="auth-card">

        <div className="auth-logo">🛡️</div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue checking internship opportunities.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉️</span>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span>🔒</span>

              <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Enter your password"
  required
/>

              <span
  className="password-eye"
  onClick={() => setShowPassword(!showPassword)}
>
  👁️
</span>
            </div>
          </div>

          {/* Remember Me */}
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-divider">
          <span></span>
          <p>Don't have an account?</p>
          <span></span>
        </div>

        <p className="auth-switch">
          <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/" className="back-home">
          ← &nbsp; Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Login;