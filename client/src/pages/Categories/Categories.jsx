// src/pages/Categories/Categories.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const { category } = useParams(); // hämtar kategori från URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch(`http://localhost:8000/api/categories/${category}`) 
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Error fetching category:", err));
}, [category]);

  return (
    <>
      <Header />

      <main className="categories-page">
        <h1>{category}</h1>

        <div className="category-products">
          {products.length > 0 ? (
            products.map((p) => ( // Loopar igenom produkterna och visar varje produkt
              <div key={p.id} className="category-item">
                <Link to={`/products/${p.name}`}>
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>{p.price} kr</p>
                </Link>
              </div>
            ))
          ) : (
            <p>Inga produkter hittades i denna kategori.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Categories;
