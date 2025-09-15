import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminProductsNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.length > 25) {
      alert("Namn är obligatoriskt och får max vara 25 tecken.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("sku", sku);
    formData.append("price", price);
    formData.append("categories", JSON.stringify(selectedCategories));

    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
      });
      if (res.ok) navigate("/admin/products");
      else alert("Kunde inte lägga till produkten.");
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
          <h3 className="admin-title">Ny produkt</h3>

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

            <label htmlFor="description" className="admin-label">Beskrivning</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-textarea admin-input-description"
            />

            <label htmlFor="image" className="admin-label">Bild</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="admin-input admin-input-file"
            />

            <label htmlFor="brand" className="admin-label">Märke</label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="admin-input admin-input-brand"
            />

            <label htmlFor="sku" className="admin-label">SKU</label>
            <input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="admin-input admin-input-sku"
            />

            <label htmlFor="price" className="admin-label">Pris</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="admin-input admin-input-price"
            />

            <label className="admin-label">Kategorier</label>
            <div className="dropdown" ref={dropdownRef}>
              <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} vald(a)`
                  : "Välj kategorier"}
              </div>
              {dropdownOpen && (
                <div className="dropdown-list">
                  {categories.map((cat) => (
                    <div key={cat.id} className="dropdown-item">
                      <input
                        type="checkbox"
                        id={`cat-${cat.id}`}
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCheckboxChange(cat.id)}
                        className="dropdown-checkbox"
                      />
                      <label htmlFor={`cat-${cat.id}`} className="dropdown-label">{cat.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="new-product">
              Lägg till
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default AdminProductsNew;
