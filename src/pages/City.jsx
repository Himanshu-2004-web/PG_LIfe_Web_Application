import { useParams } from "react-router-dom";
import { pgsData } from "../data/pgs";
import PGCard from "../components/PGCard";
import Navbar from "../components/Navbar";

export default function City() {
  const { name } = useParams();
  const pgs = pgsData[name] || [];

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        
        {/* 🔥 PREMIUM HEADING */}
        <h2 className="text-center mb-5 page-title">
          {name.toUpperCase()} PGs
        </h2>

        {pgs.map((pg, i) => (
          <PGCard key={i} pg={pg} />
        ))}
      </div>

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
