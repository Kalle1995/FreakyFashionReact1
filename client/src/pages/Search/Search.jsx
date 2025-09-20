import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Search.css";

function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.trim() || ""; // Hämtar sökfrågan från URL:en

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setError(null); // Rensa felmeddelande om sökfrågan är tom
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Rensa tidigare felmeddelande
      try {
        const res = await fetch(
          `http://localhost:8000/api/products/search?q=${encodeURIComponent(
            query
          )}`
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Kunde inte hämta sökresultat.");
        setProducts([]);
      } finally {
      setLoading(false); // Sätt loading till false när fetch är klar, oavsett resultat
        }
    };

    fetchProducts();
  }, [query]); // Körs när komponenten mountas eller när 'query' ändras

  return (
    <>
      <Header />
      <main className="search-page">
        {loading && <p>Laddar...</p>}

        {error && <p className="error">{error}</p>} {/* Visa felmeddelande om det finns ett fel */}

        {!loading && !error && products.length > 0 && ( // Om inte laddar, inget fel och produkter finns
          <>
            <p>Hittade {products.length} Produkter</p>
            <div className="search-results">
              {products.map((p) => (
                <div key={p.name} className="search-item">
                  <Link to={`/products/${p.name}`}>
                    <div className="image-wrapper">
                      <img src={p.image} alt={p.name} className="product-pic" />
                      <img
                        src="../../public/favourite.png"
                        alt="favorite"
                        className="product-icon"
                      />
                    </div>
                    <h3>{p.name}</h3>
                    <p>{p.price} kr</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && products.length === 0 && (
          <p>Inga produkter matchade din sökning.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Search;
