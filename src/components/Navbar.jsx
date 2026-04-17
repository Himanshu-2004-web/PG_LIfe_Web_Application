import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    agree: false,
  });

  // 🔄 Sync user
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    };

    syncUser();

    window.addEventListener("userChanged", syncUser);

    return () => window.removeEventListener("userChanged", syncUser);
  }, []);

  // 🔥 OPEN MODAL
  const openModal = (id) => {
    const modal = new window.bootstrap.Modal(document.getElementById(id));
    modal.show();
  };

  // ✅ SIGNUP (NO AUTO LOGIN)
  const handleSignup = () => {
    if (
      !signup.name ||
      !signup.email ||
      !signup.password ||
      !signup.phone ||
      !signup.college ||
      !signup.agree
    ) {
      toast.error("All fields required!");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(signup));

    toast.success("Signup successful! Please login.");

    window.bootstrap.Modal.getInstance(
      document.getElementById("signup"),
    ).hide();
  };

  // ✅ LOGIN
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      !storedUser ||
      storedUser.email !== login.email ||
      storedUser.password !== login.password
    ) {
      toast.error("Invalid credentials!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(storedUser));
    setUser(storedUser);

    // ✅ ADD HERE
    window.dispatchEvent(new Event("userChanged"));

    toast.success("Login successful!");

    window.bootstrap.Modal.getInstance(document.getElementById("login")).hide();
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");

    // 🔥 ADD THIS
    localStorage.removeItem("likedPGs");
    localStorage.removeItem("bookings");

    setUser(null);

    window.dispatchEvent(new Event("userChanged"));

    toast.success("Logged out!");

    navigate("/");
  };

  return (
    <>
      <nav className="navbar custom-navbar px-4 d-flex justify-content-between">
        <span className="logo" onClick={() => navigate("/")}>
          PG Life
        </span>

        <div>
          {!user ? (
            <>
              <button
                className="btn btn-outline-light me-2 nav-btn"
                type="button"
                onClick={() => openModal("login")}
              >
                Login
              </button>

              <button
                className="btn btn-gradient nav-btn"
                type="button"
                onClick={() => openModal("signup")}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <span className="me-3 name">👋 {user.name}</span>

              <button
                className="btn btn-gradient me-2 nav-btn"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>

              <button className="btn btn-danger nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* LOGIN MODAL */}
      <div className="modal fade" id="login">
        <div className="modal-dialog">
          <div className="modal-content modal-custom p-4">
            <h4 className="text-center mb-3">Login</h4>

            <input
              className="form-control mb-2"
              placeholder="Email"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />

            <button className="btn btn-gradient w-100" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>

      {/* SIGNUP MODAL */}
      <div className="modal fade" id="signup">
        <div className="modal-dialog">
          <div className="modal-content modal-custom p-4">
            <h4 className="text-center mb-3">Create Account</h4>

            <input
              className="form-control mb-2"
              placeholder="Name"
              onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) =>
                setSignup({ ...signup, password: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Phone Number"
              onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="College Name"
              onChange={(e) =>
                setSignup({ ...signup, college: e.target.value })
              }
            />

            <div className="form-check mb-3 text-start">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) =>
                  setSignup({ ...signup, agree: e.target.checked })
                }
              />
              <label className="form-check-label">
                Accept Terms & Conditions
              </label>
            </div>

            <button className="btn btn-gradient w-100" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
