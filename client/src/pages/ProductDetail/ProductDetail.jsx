// src/pages/ProductDetail/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

function ProductDetail() {
  const { name } = useParams(); // Produktnamn från URL
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    // Hämta huvudprodukten
    fetch(`http://localhost:8000/api/products/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        document.title = data.name;
      })
      .catch((err) => console.error("Error fetching product:", err));

    // Hämta 3 liknande produkter (kan ändras)
    fetch(`http://localhost:8000/api/products/${name}/similar`)
      .then((res) => res.json())
      .then((data) => setSimilar(data))
      .catch((err) => console.error("Error fetching similar products:", err));
  }, [name]);

  if (!product) return <p>Loading...</p>;

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
          <button onClick={() => alert("Lagt i varukorgen")}>Lägg i varukorg</button>
        </div>
      </div>

      {similar.length > 0 && (
        <>
          <h2 className="similar">Liknande produkter</h2>
          <div className="img-slide-section">
            {similar.map((p) => (
              <div key={p.id} className="slide-item">
                <a href={`/products/${p.name}`}>
                  <img className="slide-image" src={p.image} alt={p.name} />
                  <p>{p.name}</p>
                  <p>{p.price} kr</p>
                </a>
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
