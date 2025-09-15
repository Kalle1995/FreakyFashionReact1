import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products") // hämta alla produkter från ditt API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <header className="admin-header">
        <p>Administration</p>
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
          <div className="admin-new-produkt">
            <h3 className="admin-title">Produkter</h3>
            <Link to="/admin/products/new" className="new-product">
              Ny Produkt
            </Link>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Namn</th>
                <th>SKU</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.price} kr</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Inga produkter hittades</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default AdminProducts;
