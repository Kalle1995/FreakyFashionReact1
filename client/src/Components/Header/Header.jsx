import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <header>
      <div className="wholeHead">
        <a href="/">
          <img
            src="https://placehold.co/300x100"
            alt="Freaky Fashion logo"
            className="icon"
          />
        </a>

        <div className="searchAndIcons">
          <form action="/search" method="get" id="searchForm">
            <input
              id="searchBar"
              name="q"
              placeholder="Sök produkt"
              className="search"
            />
          </form>

          <div className="headIcons">
            <a href="">
              <img src="/favourite-(1).png" alt="Favoriter" />
            </a>
            <a href="">
              <img src="/cart.png" alt="Varukorg" />
            </a>
          </div>
        </div>
      </div>

      <nav className="NavList">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="nav-list-item">
              <Link to={`/categories/${category.name.toLowerCase()}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
