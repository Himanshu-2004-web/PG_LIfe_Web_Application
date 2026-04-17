import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PGCard({ pg }) {
  const [liked, setLiked] = useState(false);
  const [months, setMonths] = useState(1);

  // ✅ NEW STATES
  const [form, setForm] = useState({
  months: 1,
  moveIn: "",
  roomType: "Single",
  payment: "UPI",
});

  const modalId = `book-${pg.name.replace(/\s/g, "")}`;

  // ✅ Sync user + likes
  useEffect(() => {
    const syncData = () => {
      const likedPGs = JSON.parse(localStorage.getItem("likedPGs")) || [];
      const exists = likedPGs.find((p) => p.name === pg.name);
      setLiked(!!exists);
    };

    syncData();

    window.addEventListener("userChanged", syncData);
    return () => window.removeEventListener("userChanged", syncData);
  }, [pg.name]);

  // ❤️ LIKE
  const handleLike = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Login first to like PG");
      return;
    }

    let likedPGs = JSON.parse(localStorage.getItem("likedPGs")) || [];

    const exists = likedPGs.find((p) => p.name === pg.name);

    if (exists) {
      likedPGs = likedPGs.filter((p) => p.name !== pg.name);
      toast.info("Removed from favourites");
    } else {
      likedPGs.push(pg);
      toast.success("Added to favourites ❤️");
    }

    localStorage.setItem("likedPGs", JSON.stringify(likedPGs));
    window.dispatchEvent(new Event("userChanged"));
  };

  // 📦 BOOKING
  const handleBooking = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return toast.error("Login first!");

  if (!form.moveIn) {
    toast.error("Select move-in date ⚠️");
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push({
    ...pg,
    ...form,
    user: {
      name: user.name,
      phone: user.phone,
    },
  });

  localStorage.setItem("bookings", JSON.stringify(bookings));

  toast.success(`🎉 Booked via ${form.payment}`);

  const modal = window.bootstrap.Modal.getInstance(
    document.getElementById(modalId)
  );
  modal.hide();
};

  return (
    <>
      {/* ✅ CARD */}
      <div className="pg-card interactive-card p-3 mb-4 position-relative">
        {/* CAROUSEL */}
        <div id={modalId + "-carousel"} className="carousel slide mb-3">
          <div className="carousel-inner">
            {pg.images.map((img, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={i}
              >
                <div className="img-wrapper">
                  <img src={img} className="d-block w-100 card-img" alt="pg" />
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${modalId}-carousel`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${modalId}-carousel`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* CONTENT */}
        <h4 className="pg-title">
          {pg.name}
          <span className="heart float-end" onClick={handleLike}>
            {liked ? "❤️" : "🤍"}
          </span>
        </h4>

        <p className="pg-address">{pg.address}</p>

        <p className="pg-rent">
          <strong>{pg.rent}</strong>
        </p>

        <div className="rating">
          {"★".repeat(Math.floor(pg.rating))}
          {"☆".repeat(5 - Math.floor(pg.rating))}
        </div>

        <div className="feature-tooltip">
          <span className="feature-label">View Features 👀</span>

          <div className="feature-box">
            <p><strong>🏢 Building:</strong> {pg.features.building}</p>
            <p><strong>📺 Common:</strong> {pg.features.common}</p>
            <p><strong>🛏 Bedroom:</strong> {pg.features.bedroom}</p>
            <p><strong>🚿 Washroom:</strong> {pg.features.washroom}</p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="btn btn-gradient w-100 mt-2"
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
              toast.error("⚠️ Login first to book");
              return;
            }

            const modal = new window.bootstrap.Modal(
              document.getElementById(modalId)
            );
            modal.show();
          }}
        >
          Book Now
        </button>
      </div>

      {/* ✅ UPDATED MODAL */}
      <div className="modal fade" id={modalId}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content booking-modal p-4 booking-modal">

      <h3 className="modal-title text-center mb-3">{pg.name}</h3>

      {/* 🔥 BOOKING SUMMARY */}
      <div className="booking-summary mb-3">
        <p><strong>Rent:</strong> {pg.rent}</p>
        <p><strong>Room:</strong> {form.roomType}</p>
        <p><strong>Duration:</strong> {form.months} months</p>
      </div>

      {/* FORM */}
      <div className="booking-form">

        <label className="label">Move-in Date</label>
        <input
          type="date"
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, moveIn: e.target.value })
          }
        />

        <label className="label">Room Type</label>
        <select
          className="form-control mb-2"
          onChange={(e) =>
            setForm({ ...form, roomType: e.target.value })
          }
        >
          <option>Single</option>
          <option>Double</option>
          <option>Triple</option>
        </select>

        <label className="label">Months</label>
        <input
          type="number"
          min="1"
          className="form-control mb-3"
          value={form.months}
          onChange={(e) =>
            setForm({ ...form, months: e.target.value })
          }
        />

        {/* 🔥 PAYMENT OPTIONS */}
        <label className="label">Payment Method</label>
        <div className="payment-options mb-3">

          <div
            className={`pay-box ${form.payment === "UPI" ? "active" : ""}`}
            onClick={() => setForm({ ...form, payment: "UPI" })}
          >
            📱 UPI
          </div>

          <div
            className={`pay-box ${form.payment === "Card" ? "active" : ""}`}
            onClick={() => setForm({ ...form, payment: "Card" })}
          >
            💳 Card
          </div>

          <div
            className={`pay-box ${form.payment === "Cash" ? "active" : ""}`}
            onClick={() => setForm({ ...form, payment: "Cash" })}
          >
            💵 Cash
          </div>

        </div>

        <button
          className="btn btn-gradient w-100"
          onClick={handleBooking}
        >
          Confirm Booking 🚀
        </button>
      </div>

    </div>
  </div>
</div>
    </>
  );
}
