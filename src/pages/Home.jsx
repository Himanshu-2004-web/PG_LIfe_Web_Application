import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const cities = ["delhi", "chandigarh", "bengaluru", "mohali"];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your <span>Dream Stay</span>
          </h1>

          <p className="hero-subtitle">
            Smart Living • Smart Choices • Smart You
          </p>
        </div>
      </div>

      {/* CITY SECTION */}
      <div className="container mt-5">
        <div className="row">
          {cities.map((city, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div
                className="city-card"
                onClick={() => navigate(`/city/${city}`)}
              >
                <img src={`/images/${city}.jpg`} alt={city} />

                <div className="city-overlay">
                  <h5 className="city-name">{city.toUpperCase()}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
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