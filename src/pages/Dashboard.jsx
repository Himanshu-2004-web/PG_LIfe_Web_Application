import Navbar from "../components/Navbar";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];
  const liked =
    JSON.parse(localStorage.getItem("likedPGs")) || [];

  return (
    <>
      <Navbar />

      <div className="container mt-5 dashboard-container">
        {!user ? (
          <h2 className="text-center text-glow">Login First 🔒</h2>
        ) : (
          <>
            {/* 🔥 TOP GREETING */}
            <div className="dashboard-header mb-4">
              <h2 className="gradient-text">
                Welcome back, {user.name} 👋
              </h2>
              <p className="sub-text">
                Manage your bookings & favorites
              </p>
            </div>

            {/* 🔥 STATS */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="stat-card">
                  <h3>{liked.length}</h3>
                  <p className="sub-text">❤️ Liked PGs</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="stat-card">
                  <h3>{bookings.length}</h3>
                  <p className="sub-text">📦 Bookings</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="stat-card">
                  <h3>₹{
                    bookings.reduce((acc, b) => {
                      const price = parseInt(b.rent.replace(/[^\d]/g, ""));
                      return acc + (price || 0);
                    }, 0)
                  }</h3>
                  <p className="sub-text">Total Spend</p>
                </div>
              </div>
            </div>

            <div className="row">
              {/* 👤 USER PROFILE */}
              <div className="col-md-4 mb-4">
                <div className="dashboard-card fancy-card text-center h-100">
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>
                  <h4 className="gradient-text mt-3">{user.name}</h4>
                  <p className="sub-text">{user.email}</p>
                  <p className="sub-text">📞 {user.phone || "N/A"}</p>
                  <p className="sub-text">🎓 {user.college || "N/A"}</p>
                </div>
              </div>

              {/* ❤️ LIKED */}
              <div className="col-md-4 mb-4">
                <div className="dashboard-card fancy-card h-100">
                  <h4>❤️ Liked PGs</h4>

                  {liked.length === 0 ? (
                    <p className="sub-text">No liked PGs</p>
                  ) : (
                    liked.map((p, i) => (
                      <div key={i} className="list-row hover-row">
                        <span>{p.name}</span>
                        <span className="price">{p.rent}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 📦 BOOKINGS */}
              <div className="col-md-4 mb-4">
                <div className="dashboard-card fancy-card h-100">
                  <h4>📦 Bookings</h4>

                  {bookings.length === 0 ? (
                    <p className="sub-text">No bookings yet</p>
                  ) : (
                    bookings.map((b, i) => (
                      <div key={i} className="booking-item hover-row">
                        <h5>{b.name}</h5>
                        <div className="list-row">
                          <span className="price">{b.rent}</span>
                          <span className="sub-text">
                            {b.months} months
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <h3 className="footer-logo">PG Life ✨</h3>
        <p className="footer-tagline">
          Find your comfort zone anywhere in India 🇮🇳
        </p>

        <div className="footer-links">
          <span><a href="/city/delhi">Delhi</a></span>
          <span><a href="/city/chandigarh">Chandigarh</a></span>
          <span><a href="/city/bengaluru">Bengaluru</a></span>
          <span><a href="/city/mohali">Mohali</a></span>
        </div>

        <p className="copyright">
          © 2026 PG Life • Designed with ❤️ by Himanshu
        </p>
      </footer>
    </>
  );
}