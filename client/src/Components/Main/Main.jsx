import React, { useState, useEffect } from "react";
import "./Main.css";
import Hero from "../Hero/Hero";
import { Link } from "react-router-dom";

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
/>     {/* Hero-komponenten visar den första produkten i headProdukter med 0*/}


      <div className="lorem-inside-img">
        {headProdukter.map((produkt, index) => (
          <div key={index} className="lorem-inside-parent">
            <p className="first-lorem">{produkt.name}</p>
            <Link to={`/products/${produkt.name}`}>
              <img
                src={produkt.image}
                alt={produkt.name}
              />
            </Link>
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
            <Link to=""><img
              className="product-icon"
              src="/favourite.png"
              alt="Favorit"
            /> 
            </Link>
              <Link to={`/products/${produkt.name}`}>
              <img
                className="product-pic"
                src={produkt.image}
                alt={produkt.name}
              />
            </Link>
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
