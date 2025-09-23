// src/pages/ProductDetail/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetail.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

function ProductDetail() {
  const { name } = useParams(); // Hämta produktnamnet från URL:en
  const [product, setProduct] = useState(null); // State för huvudprodukten
  const [similar, setSimilar] = useState([]); // State för liknande produkter

  useEffect(() => { // Körs när komponenten mountas eller när 'name' ändras
    // Hämta huvudprodukten
    fetch(`http://localhost:8000/api/products/${name}`)
      .then((res) => res.json()) // Omvandlar svaret till JSON
      .then((data) => { // Hantera den hämtade produktdatan
        setProduct(data); // Spara produktdata i state
        document.title = `${data.name} | Freaky Fashion`;
      })
      .catch((err) => console.error("Error fetching product:", err)); // Felhantering. om det något fel.

    // Hämta liknande produkter
    fetch(`http://localhost:8000/api/products/${name}/similar`)
      .then((res) => res.json()) // Omvandlar svaret till JSON
      .then((data) => setSimilar(data)) // Spara liknande produkter i state
      .catch((err) => console.error("Error fetching similar products:", err));
  }, [name]);

  if (!product) return <p>Loading...</p>;  // Visar laddningsmeddelande medan data hämtas så att klienten inte försöker rendera innan data finns

  return (

    <>

    <Header />

    <main className="product-detail">
      <div className="info-cart">
        <div className="info-cart-image">
          <img className="head-image loremPic" src={product.image} alt={product.name} />
          <img className="info-cart-logo" src="/favourite.png" alt="Favorit" />
        </div>
        <div className="info-item">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span className="prise">{product.price} SEK</span>
          <button>Lägg i varukorg</button>
        </div>
      </div>

      {similar.length > 0 && (
        <>
          <h2 className="similar">Liknande produkter</h2>
          <div className="img-slide-section">
            {similar.map((p) => (
              <div key={p.id} className="slide-item"> 
                <Link to={`/products/${p.name}`}>
                  <img className="slide-image" src={p.image} alt={p.name} />
                  <p>{p.name}</p>
                  <p>{p.price} kr</p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </main>

    <Footer />
    </>
  );
}

export default ProductDetail;
