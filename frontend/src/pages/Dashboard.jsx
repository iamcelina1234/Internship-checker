import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  
  const [stats, setStats] = useState({
    totalChecks: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
  });

  const [recentChecks, setRecentChecks] = useState([]);

  // =========================
  // GET LOGGED-IN USER
  // =========================

  const storedUser = sessionStorage.getItem("user");
 const currentUser = storedUser ? JSON.parse(storedUser) : null;
  let userId = null;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      
      userId = user.id || user._id;
    } catch (error) {
      console.error("User data error:", error);
    }
  }

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    if (!userId) {
      console.log("User ID not found");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // -------------------------
        // Dashboard statistics
        // -------------------------

        const statsResponse = await fetch(
          `http://localhost:5000/api/checker/stats/${userId}`
        );

        const statsData = await statsResponse.json();

        if (statsResponse.ok) {
          setStats(statsData);
        }

        // -------------------------
        // Recent checks
        // -------------------------

        const historyResponse = await fetch(
          `http://localhost:5000/api/checker/${userId}`
        );

        const historyData = await historyResponse.json();

        if (historyResponse.ok) {
          setRecentChecks(
            historyData.checks
              ? historyData.checks.slice(0, 3)
              : []
          );
        }
      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      }
    };

    fetchDashboardData();
  }, [userId]);

  return (
    <div className="checker-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="dashboard-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
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


      {/* =========================
          BODY
      ========================= */}

      <div className="dashboard-body">

        {/* =========================
            SIDEBAR
        ========================= */}

        <aside className="sidebar">

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            📊
            <span>Dashboard</span>
          </Link>


          <Link
            to="/checker"
            className="sidebar-link"
          >
            🔍
            <span>Check Internship</span>
          </Link>


          <Link
            to="/history"
            className="sidebar-link"
          >
            📋
            <span>History</span>
          </Link>


          <Link
            to="/settings"
            className="sidebar-link"
          >
            ⚙️
            <span>Settings</span>
          </Link>

        </aside>


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="checker-main">

          {/* Heading */}

          <div className="checker-heading">

            <h1>
              Dashboard 📊
            </h1>

            <p>
              Welcome back! Here's an overview
              of your internship checks.
            </p>

          </div>


          {/* =========================
              STAT CARDS
          ========================= */}

          <div className="dashboard-stats">

            {/* Total */}

            <div className="stat-card">

              <div className="stat-icon">
                🔍
              </div>

              <div>
                <p>Total Checks</p>

                <h2>
                  {stats.totalChecks}
                </h2>
              </div>

            </div>


            {/* High Risk */}

            <div className="stat-card">

              <div className="stat-icon">
                🔴
              </div>

              <div>
                <p>High Risk</p>

                <h2>
                  {stats.highRisk}
                </h2>
              </div>

            </div>


            {/* Medium Risk */}

            <div className="stat-card">

              <div className="stat-icon">
                🟠
              </div>

              <div>
                <p>Medium Risk</p>

                <h2>
                  {stats.mediumRisk}
                </h2>
              </div>

            </div>


            {/* Low Risk */}

            <div className="stat-card">

              <div className="stat-icon">
                🟢
              </div>

              <div>
                <p>Low Risk</p>

                <h2>
                  {stats.lowRisk}
                </h2>
              </div>

            </div>

          </div>


          {/* =========================
              RECENT CHECKS
          ========================= */}

          <div className="dashboard-section">

            <div className="section-header">

              <div>
                <h2>
                  Recent Checks
                </h2>

                <p>
                  Your latest internship
                  verification results.
                </p>
              </div>

              <Link
                to="/history"
                className="view-all-btn"
              >
                View All
              </Link>

            </div>


            {/* No checks */}

            {recentChecks.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  🔍
                </div>

                <h3>
                  No internships checked yet
                </h3>

                <p>
                  Start by checking an
                  internship opportunity.
                </p>

                <Link
                  to="/checker"
                  className="empty-check-btn"
                >
                  Check an Internship
                </Link>

              </div>

            ) : (

              /* Recent checks list */

              <div className="recent-check-list">

                {recentChecks.map((check) => (

                  <div
                    className="recent-check-card"
                    key={check._id}
                  >

                    <div className="recent-check-details">

                      <h3>
                        {check.company}
                      </h3>

                      <p>
                        {check.role}
                      </p>

                    </div>


                    <div className="recent-check-info">

                      <span
                        className={
                          check.riskLevel ===
                          "High Risk"
                            ? "dashboard-risk high-risk"
                            : check.riskLevel ===
                              "Medium Risk"
                            ? "dashboard-risk medium-risk"
                            : "dashboard-risk low-risk"
                        }
                      >
                        {check.riskLevel}
                      </span>

                      <strong>
                        {check.riskScore}/100
                      </strong>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* =========================
              CHECK INTERNSHIP CTA
          ========================= */}

          <div className="dashboard-cta">

            <div className="dashboard-cta">

              <h2>
                Have another internship offer?
              </h2>

              <p>
                Check it before sharing your
                personal information or paying
                any fees.
              </p>

            </div>

            <Link
              to="/checker"
              className="check-internship-btn"
            >
              🔍 Check Internship
            </Link>

          </div>


          {/* =========================
              SAFETY NOTE
          ========================= */}

          <div className="checker-note">

            <span>
              🛡️
            </span>

            <div>

              <strong>
                Stay Safe
              </strong>

              <p>
                Never share passwords, OTPs,
                banking details or pay money
                to get an internship.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;