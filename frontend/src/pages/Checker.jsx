import { Link } from "react-router-dom";
import { useState } from "react";

function Checker() {
  const storedUser = sessionStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [result, setResult] = useState(null);

  const checkInternship = async (e) => {
    e.preventDefault();

    const form = e.target;

    const company = form.company.value.trim();
    const role = form.role.value.trim();
    const website = form.website.value.trim();
    const email = form.email.value.trim();
    const offerDetails = form.offerDetails.value.trim();

    if (!storedUser) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const response = await fetch(
        "http://localhost:5000/api/checker",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,
            company,
            role,
            website,
            email,
            offerDetails,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setResult(data.result);

    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="checker-page">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-logo">
          🛡️ Internship Checker
        </Link>

        <div className="dashboard-user">

          <span className="user-avatar">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </span>

          <span>
            {currentUser?.name || "User"}
          </span>

          <Link
            to="/"
            className="logout-btn"
          >
            Logout
          </Link>

        </div>

      </nav>


      {/* DASHBOARD BODY */}

      <div className="dashboard-body">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <Link
            to="/dashboard"
            className="sidebar-link"
          >
            📊
            <span>
              Dashboard
            </span>
          </Link>

          <Link
            to="/checker"
            className="sidebar-link active"
          >
            🔍
            <span>
              Check Internship
            </span>
          </Link>

          <Link
            to="/history"
            className="sidebar-link"
          >
            📋
            <span>
              History
            </span>
          </Link>

          <Link
            to="/settings"
            className="sidebar-link"
          >
            ⚙️
            <span>
              Settings
            </span>
          </Link>

        </aside>


        {/* MAIN CONTENT */}

        <main className="checker-main">

          {/* HEADING */}

          <div className="checker-heading">

            <h1>
              Check an Internship 🔍
            </h1>

            <p>
              Enter the internship details below and we'll help you
              identify potential risks.
            </p>

          </div>


          {/* CHECKER CARD */}

          <div className="checker-card">

            <div className="checker-columns">

              {/* =========================
                  LEFT SIDE - FORM
              ========================= */}

              <div className="checker-form-section">

                <div className="checker-card-header">

                  <h2>
                    Internship Details
                  </h2>

                  <p>
                    Provide the information you received about the internship.
                  </p>

                </div>


                <form
                  className="checker-form"
                  onSubmit={checkInternship}
                >

                  {/* Company */}

                  <div className="checker-input-group">

                    <label>
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. ABC Technologies"
                    />

                  </div>


                  {/* Role */}

                  <div className="checker-input-group">

                    <label>
                      Internship Role
                    </label>

                    <input
                      type="text"
                      name="role"
                      placeholder="e.g. Full Stack Developer Intern"
                    />

                  </div>


                  {/* Website */}

                  <div className="checker-input-group">

                    <label>
                      Company / Internship Website
                    </label>

                    <input
                      type="url"
                      name="website"
                      placeholder="https://example.com"
                    />

                  </div>


                  {/* Email */}

                  <div className="checker-input-group">

                    <label>
                      Contact Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="hr@example.com"
                    />

                  </div>


                  {/* Offer Details */}

                  <div className="checker-input-group">

                    <label>
                      Offer Details
                    </label>

                    <textarea
                      name="offerDetails"
                      rows="5"
                      placeholder="Paste important details about the internship offer here..."
                    ></textarea>

                  </div>


                  {/* Submit */}

                  <button
                    type="submit"
                    className="check-internship-btn"
                  >
                    🔍 Check Internship
                  </button>

                </form>

              </div>


              {/* =========================
                  RIGHT SIDE - RESULT
              ========================= */}

              {result && (

                <div className="checker-result">

                  <h2>
                    🔍 Analysis Result
                  </h2>


                  {/* Risk Score */}

                  <div className="risk-box">

                    <h3>
                      Risk Score
                    </h3>

                    <div className="risk-score">
                      {result.riskScore} / 100
                    </div>

                  </div>


                  {/* Status */}

                  <div
                    className={`status-box ${
                      result.level === "High Risk"
                        ? "high-risk"
                        : result.level === "Medium Risk"
                        ? "medium-risk"
                        : "low-risk"
                    }`}
                  >

                    <h3>
                      Status
                    </h3>

                    <strong>
                      {result.level}
                    </strong>

                    <p>
                      {result.message}
                    </p>

                  </div>


                  {/* Warning Signs */}

                  {result.reasons.length > 0 && (

                    <div className="warning-box">

                      <h3>
                        ⚠️ Warning Signs
                      </h3>

                      <ul>

                        {result.reasons.map(
                          (reason, index) => (
                            <li key={index}>
                              {reason}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}


                  {/* Positive Signs */}

                  {result.positiveSigns.length > 0 && (

                    <div className="positive-box">

                      <h3>
                        ✅ Positive Signs
                      </h3>

                      <ul>

                        {result.positiveSigns.map(
                          (sign, index) => (
                            <li key={index}>
                              {sign}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              )}

            </div>

          </div>


          {/* SAFETY NOTE */}

          <div className="checker-note">

            <span>
              🛡️
            </span>

            <div>

              <strong>
                Stay Safe
              </strong>

              <p>
                Never share passwords, OTPs, banking details or
                pay money to get an internship.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Checker;