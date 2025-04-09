import React, { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ\s]/g, "").slice(0, 25);
    setForm((prev) => ({ ...prev, name: value }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setForm((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className={`form-container ${darkMode ? "dark" : ""}`}>
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "☀️ " : "🌙 "}
      </button>

      <h2>Ödeme Bilgileri</h2>
      <p>Kredi kartı bilgilerinizi giriniz</p>

      <form onSubmit={handleSubmit}>
        <label>Kart Üzerindeki İsim</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleNameChange}
          placeholder="Tolga Çavga"
          maxLength="25"
        />

        <label>Kart Numarası</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          inputMode="numeric"
        />

        <div className="row">
          <div>
            <label>Ay</label>
            <select name="month" value={form.month} onChange={handleChange}>
              <option value="">AA</option>
              {months.map((m) => (
                <option key={m} value={m < 10 ? `0${m}` : m}>
                  {m < 10 ? `0${m}` : m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Yıl</label>
            <select name="year" value={form.year} onChange={handleChange}>
              <option value="">YY</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Güvenlik Kodu</label>
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                setForm((prev) => ({ ...prev, cvv: value }));
              }}
              maxLength="3"
              placeholder="123"
            />
          </div>
        </div>

        <button type="submit">Şimdi Öde</button>
      </form>
    </div>
  );
};

export default PaymentForm;