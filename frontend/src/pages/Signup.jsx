import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    setError("");

    // Password check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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

    

      navigate("/login");
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

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your account and start checking internship opportunities safely.
        </p>

        <form className="auth-form" onSubmit={handleSignup}>

          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>

            <div className="input-wrapper">
              <span>👤</span>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
                type="password"
                name="password"
                placeholder="Create a password"
                required
              />

              <span className="password-eye">👁️</span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>

            <div className="input-wrapper">
              <span>🔐</span>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Terms */}
          <label className="terms-checkbox">
            <input type="checkbox" required />

            <span>
              I agree to the Terms & Conditions
            </span>
          </label>

          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="auth-switch signup-switch">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="back-home">
          ← &nbsp; Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Signup;