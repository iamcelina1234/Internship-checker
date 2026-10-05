import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <h2>🛡️ Internship Checker</h2>

        <div className="nav-links">

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        {/* Background Decorations */}

        <div className="hero-circle circle-left"></div>

        <div className="hero-circle circle-right"></div>

        <div className="hero-circle circle-bottom"></div>


        <div className="dot-pattern dots-left">
          • • •
          <br />
          • • •
          <br />
          • • •
        </div>


        <div className="dot-pattern dots-right">
          • • •
          <br />
          • • •
          <br />
          • • •
        </div>


        {/* Floating Document */}

        <div className="floating-card document-card">

          <div className="document-icon">
            💼
          </div>

          <div className="document-line long"></div>

          <div className="document-line"></div>

          <div className="document-line short"></div>

          <div className="search-circle">
            🔍
          </div>

        </div>


        {/* Floating Shield */}

        <div className="floating-shield">
          🛡️
        </div>


        {/* Hero Content */}

        <div className="hero-content">

          <div className="tagline">
            🛡️ Stay Safe. Check Before You Apply.
          </div>


          <h1>
            Is Your Internship
            <br />
            <span>Really Legit?</span>
          </h1>


          <p className="hero-text">
            Analyze internship opportunities and identify
            potential warning signs before sharing your
            personal information or investing your time.
          </p>


          <div className="hero-buttons">

            <Link
              to="/checker"
              className="primary-btn"
            >
              🔍 Check an Internship
            </Link>


            <Link
              to="/signup"
              className="secondary-btn"
            >
              Get Started →
            </Link>

          </div>

        </div>


        {/* Small Note */}

        <div className="safe-note">
          Better decisions.
          <br />
          Safer opportunities.
        </div>

      </section>


      {/* ================= WHY USE ================= */}

      <section className="features">

        <div className="section-line"></div>

        <h2>
          Why use Internship Checker?
        </h2>


        <p className="section-subtitle">
          Make smarter decisions before applying to an internship.
        </p>


        <div className="feature-grid">


          <div className="feature-card">

            <div className="feature-icon">
              🔍
            </div>

            <div>

              <h3>
                Risk Analysis
              </h3>

              <p>
                Identify common warning signs found
                in suspicious internship opportunities.
              </p>

            </div>

          </div>



          <div className="feature-card">

            <div className="feature-icon warning-icon">
              ⚠️
            </div>

            <div>

              <h3>
                Warning Signs
              </h3>

              <p>
                Get clear explanations of potentially
                risky details in an internship offer.
              </p>

            </div>

          </div>



          <div className="feature-card">

            <div className="feature-icon score-icon">
              📊
            </div>

            <div>

              <h3>
                Risk Score
              </h3>

              <p>
                Understand the overall risk level with
                a simple 0–100 risk score.
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works">

        <div className="section-line"></div>


        <h2>
          How It Works
        </h2>


        <p className="section-subtitle">
          Check an internship in just three simple steps.
        </p>


        <div className="steps-grid">


          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Enter Internship Details
            </h3>

            <p>
              Add the company, internship details,
              website, stipend and other important
              information.
            </p>

          </div>



          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>
              We Analyze It
            </h3>

            <p>
              Our checker looks for common warning
              signs and suspicious patterns.
            </p>

          </div>



          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Get Your Risk Result
            </h3>

            <p>
              See your risk score along with warning
              signs and positive indicators.
            </p>

          </div>


        </div>

      </section>


      {/* ================= WHAT WE CHECK ================= */}

      <section className="what-we-check">

        <div className="section-line"></div>


        <h2>
          What We Check
        </h2>


        <p className="section-subtitle">
          We look for common signs that may indicate
          a risky internship.
        </p>


        <div className="checks-grid">


          <div className="check-card">

            <div className="check-icon">
              💰
            </div>

            <div>

              <h3>
                Payment Requests
              </h3>

              <p>
                Registration fees, training fees,
                deposits or other payment requests.
              </p>

            </div>

          </div>



          <div className="check-card">

            <div className="check-icon">
              🌐
            </div>

            <div>

              <h3>
                Company Website
              </h3>

              <p>
                Whether the provided website uses
                a secure HTTPS connection.
              </p>

            </div>

          </div>



          <div className="check-card">

            <div className="check-icon">
              📧
            </div>

            <div>

              <h3>
                Contact Email
              </h3>

              <p>
                Whether the contact email appears
                to use a company domain.
              </p>

            </div>

          </div>



          <div className="check-card">

            <div className="check-icon">
              📱
            </div>

            <div>

              <h3>
                Communication
              </h3>

              <p>
                WhatsApp or Telegram-based
                communication can be highlighted.
              </p>

            </div>

          </div>



          <div className="check-card">

            <div className="check-icon">
              🎯
            </div>

            <div>

              <h3>
                Unrealistic Promises
              </h3>

              <p>
                Claims such as guaranteed jobs
                or unusually attractive offers.
              </p>

            </div>

          </div>



          <div className="check-card">

            <div className="check-icon">
              🔐
            </div>

            <div>

              <h3>
                Sensitive Information
              </h3>

              <p>
                Requests for bank details or other
                sensitive information.
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* ================= SAFETY CTA ================= */}

      <section className="safety-cta">

        <div className="cta-content">

          <div className="cta-icon">
            🛡️
          </div>


          <h2>
            Don't Risk Your Internship.
          </h2>


          <p>
            Take a few seconds to check an opportunity
            before you apply.
          </p>


          <Link
            to="/checker"
            className="primary-btn"
          >
            🔍 Check an Internship
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-content">

          <div>

            <h3>
              🛡️ Internship Checker
            </h3>

            <p>
              Helping students make safer internship decisions.
            </p>

          </div>


          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/checker">
              Checker
            </Link>

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 Internship Checker. Built for safer opportunities.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;