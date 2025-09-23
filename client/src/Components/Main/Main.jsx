import React, { useState, useEffect } from "react";
import Hero from "../Hero/Hero";
import { Link } from "react-router-dom";
import "./Main.css";

function Main({ showProductsHits = false }) { // showProductsHits: Prop för att visa antal produkter
  const [mainProdukter, setMainProdukter] = useState([]);
  const [headProdukter, setHeadProdukter] = useState([]);
  const randomIndex = Math.floor(Math.random() * mainProdukter.length); 


  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setMainProdukter(data); // alla produkter för mainProdukter
        setHeadProdukter(data.slice(0, 3)); // första 3 för head-produkter
      })
      .catch((err) => console.error("Fel vid hämtning av produkter:", err));
  }, []);

  return (
    <main>
      <Hero
        image={mainProdukter[randomIndex]?.image} 
        title={mainProdukter[randomIndex]?.name}
        text={mainProdukter[randomIndex]?.description}
        link={`/products/${mainProdukter[randomIndex]?.name}`}
      />     {/* Hero-komponenten visar en random produkt från mainProdukt*/}


      <div className="lorem-inside-img">
        {headProdukter.map((produkt, index) => ( // headProdukter för att visa 3 produkter högst upp
          <div key={index} className="lorem-inside-parent"> {/* key={index}: Unikt nyckel för varje element i listan */}
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
            <Link to="#" onClick={(e) => e.preventDefault()}>
              <img
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
