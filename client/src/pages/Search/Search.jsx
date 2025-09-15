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
  const query = new URLSearchParams(location.search).get("q")?.trim() || "";

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
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
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <>
      <Header />
      <main className="search-page">
        {loading && <p>Laddar...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && products.length > 0 && (
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
