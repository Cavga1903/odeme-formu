import React, { useState } from "react";
import "./PaymentForm.css"; // CSS'yi ayrı dosyaya koyacağız

const PaymentForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className="form-container">
      <h2>Ödeme Bilgileri</h2>
      <p>Kredi kartı bilgilerinizi giriniz</p>
      <form onSubmit={handleSubmit}>
        <label>Kart Üzerindeki İsim</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <label>Kart Numarası</label>
        <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} />

        <div className="row">
          <div>
            <label>Ay</label>
            <select name="month" value={form.month} onChange={handleChange}>
              <option value="">AA</option>
              {months.map((m) => (
                <option key={m} value={m < 10 ? `0${m}` : m}>{m < 10 ? `0${m}` : m}</option>
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
            <input type="text" name="cvv" value={form.cvv} onChange={handleChange} />
          </div>
        </div>

        <button type="submit">Şimdi Öde</button>
      </form>
    </div>
  );
};

export default PaymentForm;