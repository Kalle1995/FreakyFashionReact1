import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminCategoriesNew() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      document.title = "Administration";
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.length > 25) {
      alert("Namn är obligatoriskt och får max vara 25 tecken.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8000/api/categories", { // await man väntar på att fetch ska bli klar innan den går vidare
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Kategori skapad!");
        navigate("/admin/categories");
      } else {
        alert("Kunde inte skapa kategorin.");
      }
    } catch (err) {
      console.error(err);
      alert("Ett fel inträffade.");
    }
  };

  return (
    <>
      <header className="admin-header">
        <p className="admin-header-text">Administration</p>
      </header>

      <main className="admin-main">
        <aside className="admin-sidebar">
          <Link to="/admin/products" className="sidebar-link">
            Produkter
          </Link>
          <Link to="/admin/categories" className="sidebar-link">
            Kategorier
          </Link>
        </aside>

        <section className="admin-content">
          <h3 className="admin-title">Ny kategori</h3>

          <form onSubmit={handleSubmit} className="admin-form">
            <label htmlFor="name" className="admin-label">Namn</label>
            <input
              id="name"
              type="text"
              value={name}
              maxLength="25"
              onChange={(e) => setName(e.target.value)}
              required
              className="admin-input admin-input-name"
            />

            <label htmlFor="image" className="admin-label">Bild</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="admin-input admin-input-file"
            />

            <button type="submit" className="new-product">
              Lägg till 
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default AdminCategoriesNew;
