import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const storedUser = sessionStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        const user = JSON.parse(storedUser);
        const userId = user.id || user._id;

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://internship-checker.onrender.com/api/checker/${userId}`
        );

        const data = await response.json();

        if (response.ok) {
          setHistory(data.checks || []);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("History error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

 const handleDelete = async (checkId) => {
  try {
    const response = await fetch(
      `https://internship-checker.onrender.com/api/checker/${checkId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to delete history");
      return;
    }

    setHistory((prevHistory) =>
      prevHistory.filter((item) => item._id !== checkId)
    );

    setSelectedCheck(null);
    setDeleteId(null);

  } catch (error) {
    console.error("Delete history error:", error);
    alert("Server error. Please try again.");
  }
};
  return (
    <div className="checker-page">

      {/* Navbar */}

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

          <Link to="/" className="logout-btn">
            Logout
          </Link>

        </div>

      </nav>


      <div className="dashboard-body">

        {/* Sidebar */}

        <aside className="sidebar">

          <Link
            to="/dashboard"
            className="sidebar-link"
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
            className="sidebar-link active"
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


        {/* Main Content */}

        <main className="checker-main">

          <div className="checker-heading">

            <h1>
              Internship History 📋
            </h1>

            <p>
              View all the internships you have checked previously.
            </p>

          </div>


          {/* Loading */}

          {loading && (
            <div className="history-message">
              Loading history...
            </div>
          )}


          {/* No History */}

          {!loading && history.length === 0 && (
            <div className="history-message">

              <h2>
                No checks yet 🔍
              </h2>

              <p>
                You haven't checked any internship offers yet.
              </p>

              <Link
                to="/checker"
                className="check-internship-btn"
              >
                Check an Internship
              </Link>

            </div>
          )}


          {/* History */}

          {!loading && history.length > 0 && (

            <div className="history-list">

              {history.map((item) => (

                <div
                  className="history-item-row"
                  key={item._id}
                >

                  {/* History Card */}

                  <div
                    className={`history-card ${
                      selectedCheck?._id === item._id
                        ? "selected-history-card"
                        : ""
                    }`}
                    onClick={() => setSelectedCheck(item)}
                  >

                    <div className="history-card-top">

                      <div>

                        <h2>
                          {item.company}
                        </h2>

                        <p>
                          {item.role}
                        </p>

                      </div>


                      <div
                        className={`history-risk ${
                          item.riskLevel === "High Risk"
                            ? "high-risk"
                            : item.riskLevel === "Medium Risk"
                            ? "medium-risk"
                            : "low-risk"
                        }`}
                      >
                        {item.riskLevel}
                      </div>

                    </div>


                    <div className="history-card-bottom">

                      <div>

                        <span>
                          Risk Score:
                          <strong>
                            {" "}
                            {item.riskScore}/100
                          </strong>
                        </span>

                        {item.website && (
                          <span className="history-card-info">
                            🌐 {item.website}
                          </span>
                        )}

                        {item.email && (
                          <span className="history-card-info">
                            ✉️ {item.email}
                          </span>
                        )}

                      </div>


                      <span>
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </span>

                    </div>

                  </div>


                  {/* Details - selected card ke side mein */}

                  {selectedCheck?._id === item._id && (

                    <div className="history-details">

                      <div className="history-details-header">

                        <div>

                          <h2>
                            {selectedCheck.company}
                          </h2>

                          <p>
                            {selectedCheck.role}
                          </p>

                        </div>


                        <button
                          className="history-close-btn"
                          onClick={() =>
                            setSelectedCheck(null)
                          }
                        >
                          ✕
                        </button>


                        <button
  type="button"
  className="history-delete-btn"
  onClick={() => {
    console.log("DELETE CLICKED", selectedCheck?._id);
    setDeleteId(selectedCheck?._id);
  }}
>
  🗑️ Delete
</button>

                      </div>


                      {/* Risk */}

                      <div className="history-details-risk">

                        <strong>
                          Risk Score:
                        </strong>{" "}

                        {selectedCheck.riskScore}/100

                        <span>
                          {selectedCheck.riskLevel}
                        </span>

                      </div>


                      {/* Offer Details */}

                      <div className="history-detail-section">

                        <h3>
                          📄 Offer Details
                        </h3>

                        <p className="history-offer-details">
                          {selectedCheck.offerDetails ||
                            "No offer details available."}
                        </p>

                      </div>


                      {/* Warning Signs */}

                      {selectedCheck.reasons?.length > 0 && (

                        <div className="history-detail-section">

                          <h3>
                            ⚠️ Warning Signs
                          </h3>

                          <ul>

                            {selectedCheck.reasons.map(
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

                      {selectedCheck.positiveSigns?.length > 0 && (

                        <div className="history-detail-section">

                          <h3>
                            ✅ Positive Signs
                          </h3>

                          <ul>

                            {selectedCheck.positiveSigns.map(
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

              ))}

            </div>

          )}

        </main>

      </div>
      {deleteId && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <div className="delete-modal-icon">🗑️</div>

      <h3>Delete Internship Check?</h3>

      <p>
        Are you sure you want to delete this history?
        <br />
        This action cannot be undone.
      </p>

      <div className="delete-modal-actions">
        <button
          className="delete-cancel-btn"
          onClick={() => setDeleteId(null)}
        >
          Cancel
        </button>

        <button
          className="delete-confirm-btn"
          onClick={() => handleDelete(deleteId)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}



export default History;