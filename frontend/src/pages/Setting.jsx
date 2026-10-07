import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Settings() {
  const storedUser = sessionStorage.getItem("user");
const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      setUser({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };
const [showPasswordForm, setShowPasswordForm] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordMessage, setPasswordMessage] = useState("");
const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    setPasswordMessage("Please fill all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordMessage("New passwords do not match.");
    return;
  }

  if (newPassword.length < 6) {
    setPasswordMessage("New password must be at least 6 characters.");
    return;
  }

  const storedUser = sessionStorage.getItem("user");

  if (!storedUser) {
    setPasswordMessage("User session not found. Please login again.");
    return;
  }

  const userData = JSON.parse(storedUser);

  try {
    const response = await fetch(
      "https://internship-checker.onrender.com/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setPasswordMessage(data.message || "Unable to change password.");
      return;
    }

    setPasswordMessage("Password changed successfully! ✅");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error(error);
    setPasswordMessage("Server error. Please try again.");
  }
};
  return (
    <div className="dashboard-page">

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

          <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
        </div>

      </nav>


      {/* Body */}
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
            className="sidebar-link"
          >
            📋
            <span>History</span>
          </Link>

          <Link
            to="/setting"
            className="sidebar-link active"
          >
            ⚙️
            <span>Settings</span>
          </Link>

        </aside>


        {/* Main Content */}
        <main className="settings-main">

          {/* Heading */}
          <div className="settings-heading">
            <h1>Settings ⚙️</h1>

            <p>
              Manage your account and application preferences.
            </p>
          </div>


          {/* Account Settings */}
          <div className="settings-card">

            <div className="settings-card-header">
              <h2>Account Settings</h2>

              <p>
                Manage your basic account information.
              </p>
            </div>


            <div className="settings-form">

              <div className="settings-input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  value={user.name}
                  readOnly
                />
              </div>


              <div className="settings-input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>

            </div>

          </div>


          {/* Security */}
          <div className="settings-card">

            <div className="settings-card-header">
              <h2>Security</h2>

              <p>
                Manage your account security.
              </p>
            </div>


            <div className="settings-option">

              <div>
                <h3>Change Password</h3>

                <p>
                  Update your account password regularly
                  to keep your account secure.
                </p>
              </div>

              <button
  className="settings-action-btn"
  onClick={() => setShowPasswordForm(!showPasswordForm)}
>
  {showPasswordForm ? "Cancel" : "Change Password"}
</button>
{showPasswordForm && (
  <div className="password-form">

    <div className="settings-input-group">
      <label>Current Password</label>

      <input
  type="password"
  id="currentPassword"
  placeholder="Enter current password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
/>
    </div>


    <div className="settings-input-group">
      <label>New Password</label>

      <input
  type="password"
  id="newPassword"
  placeholder="Enter new password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
/>
    </div>


    <div className="settings-input-group">
      <label>Confirm New Password</label>

      <input
  type="password"
  id="confirmPassword"
  placeholder="Confirm new password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
    </div>


    <button
  className="settings-save-btn"
  type="button"
  onClick={handleChangePassword}
>
  Update Password
</button>
{passwordMessage && (
  <p className="password-message">
    {passwordMessage}
  </p>
)}

  </div>
)}

            </div>

          </div>


          {/* Preferences */}
          <div className="settings-card">

            <div className="settings-card-header">
              <h2>Preferences</h2>

              <p>
                Manage your application preferences.
              </p>
            </div>


            <div className="settings-option">

              <div>
                <h3>Safety Reminders</h3>

                <p>
                  Show safety reminders while checking
                  internship opportunities.
                </p>
              </div>

              <label className="toggle">
                <input
                  type="checkbox"
                  defaultChecked
                />

                <span className="toggle-slider"></span>
              </label>

            </div>

          </div>


          {/* Danger Zone */}
          <div className="settings-card danger-card">

            <div className="settings-card-header">
              <h2>Account Actions</h2>

              <p>
                Actions related to your account.
              </p>
            </div>


            <div className="settings-option">

              <div>
                <h3>Logout</h3>

                <p>
                  Sign out of your Internship Checker account.
                </p>
              </div>

              <button
  className="settings-logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

            </div>

          </div>


          {/* Safety Note */}
          <div className="dashboard-safety">

            <span>🛡️</span>

            <div>
              <strong>Your Safety Matters</strong>

              <p>
                Never share your password, OTP or banking
                information with anyone.
              </p>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Settings;