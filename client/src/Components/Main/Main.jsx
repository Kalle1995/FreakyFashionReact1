import React, { useState, useEffect } from "react";
import "./Main.css";
import Hero from "../Hero/Hero";

function Main({ showProductsHits = false }) {
  const [mainProdukter, setMainProdukter] = useState([]);
  const [headProdukter, setHeadProdukter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setMainProdukter(data);
        setHeadProdukter(data.slice(0, 3)); // första 3 för head-produkter
      })
      .catch((err) => console.error("Fel vid hämtning av produkter:", err));
  }, []);

  return (
    <main>
      <Hero
  image={headProdukter[0]?.image}
  title={headProdukter[0]?.name}
  text={headProdukter[0]?.description}
  link={`/products/${headProdukter[0]?.name}`}
/>


      <div className="lorem-inside-img">
        {headProdukter.map((produkt, index) => (
          <div key={index} className="lorem-inside-parent">
            <p className="first-lorem">{produkt.name}</p>
            <a href={`/products/${produkt.name}`}>
              <img
                src={produkt.image}
                alt={produkt.name}
              />
            </a>
          </div>
        ))}
      </div>

      {showProductsHits && (
        <p className="findProducts">Hittade {mainProdukter.length} produkter</p>
      )}

      <div className="products">
        {mainProdukter.map((produkt) => (
          <div key={produkt.id} className="product">
            {produkt.isNew && <p className="new-icon">Nyhet</p>}
            <a href=""><img
              className="product-icon"
              src="/favourite.png"
              alt="Favorit"
            /> 
            </a>
              <a href={`/products/${produkt.name}`}>
              <img
                className="product-pic"
                src={produkt.image}
                alt={produkt.name}
              />
            </a>
            <div className="prise">
              <p>{produkt.name}</p>
              <p>{produkt.price} SEK</p>
            </div>
          </div>
        ))}
      </div>

      <div className="All-info">
        <div className="info">
          <img src="/planet-earth.png" width="30" alt="Global" />
          <p>Gratis frakt och returer</p>
        </div>
        <div className="info">
          <img src="/plane.png" width="30" alt="Express" />
          <p>Expressfrakt</p>
        </div>
        <div className="info">
          <img src="/shield.png" width="30" alt="Säker" />
          <p>Säkra betalningar</p>
        </div>
        <div className="info">
          <img src="/smile.png" width="30" alt="Nyheter" />
          <p>Nyheter varje dag</p>
        </div>
      </div>
    </main>
  );
}

export default Main;
