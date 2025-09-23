import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = "Administration";
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories") // hämta alla kategorier från API
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <header className="admin-header">
        <p>Administration</p>
      </header>

      <main className="admin-main">
        <aside className="admin-sidebar">
          <Link to="/admin/products" className="sidebar-link">Produkter</Link>
          <Link to="/admin/categories" className="sidebar-link">Kategorier</Link>
        </aside>

        <section className="admin-content">
          <div className="admin-new-category">
            <h3 className="admin-title">Kategorier</h3>
            <Link to="/admin/categories/new" className="new-category">
              Ny kategori
            </Link>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Namn</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Inga kategorier hittades</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default AdminCategories;
