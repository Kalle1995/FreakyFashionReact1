/*React: Behövs för att bygga komponenten.
-- useEffect: Hook som körs efter att komponenten renderats → används för att hämta data (API).
--useState: Hook för att spara data i state (kategorier & söktext).
--Link: Länk från react-router-dom som byter route utan att ladda om sidan.
--useNavigate: Hook från react-router-dom för att programatiskt navigera användaren till en ny route. 
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/categories") // fetch(...): Hämtar kategorier från mitt API.
      .then((res) => res.json()) // Omvandlar svaret till JSON.
      .then((data) => setCategories(data)) // Sparar kategorierna i state.
      .catch((err) => console.error("Fel vid hämtning :", err));
  }, []);

  const handleSearch = (e) => { // Hanterar sökformulärets submit-event.
    e.preventDefault(); // Förhindrar att sidan laddas om vid submit.
    if (query.trim()) { 
      navigate(`/search?q=${query}`); // Navigerar till sökresultatsidan med sökfrågan som query-param.
      setQuery(""); // Rensar sökfältet efter navigering.
    }
  };

  return (
    <header>
      <div className="wholeHead">
        <Link to="/">
          <img
            src="https://placehold.co/300x100"
            alt="Freaky Fashion logo"
            className="icon"
          />
        </Link>

        <div className="searchAndIcons">
          <form onSubmit={handleSearch} id="searchForm"> {/* När användaren trycker Enter kallas handleSearch. */}
            <input
              id="searchBar"
              name="q"
              placeholder="Sök produkt"
              className="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)} /* Uppdaterar söktexten i state när användaren skriver. */
            />
          </form>

          <div className="headIcons">
            <Link to="">
              <img src="/favourite-(1).png" alt="Favoriter" />
            </Link>
            <Link to="">
              <img src="/cart.png" alt="Varukorg" />
            </Link>
          </div>
        </div>
      </div>

     
      <nav className="NavList">
        <ul>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="nav-list-item"> {/* Unikt nyckelvärde som React behöver för listor. */}
                <Link to={`/categories/${category.name.toLowerCase()}`}>
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="nav-list-item">Laddar kategorier...</li> /* en text som visas när din komponent ännu inte hunnit ladda klart kategorierna från databasen/API:t.. */
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
