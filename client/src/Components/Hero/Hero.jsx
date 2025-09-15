import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero({ image, title, text, link }) {
  return (
    <article className="hero-article">
      <fieldset className="hero-head">
        <Link to={link}>
          <img
            className="hero-image"
            src={image || "https://placehold.co/600x400"}
            alt={title || "Produktbild"}
          />
        </Link>
        <div className="hero-text-container">
          <h2 className="hero-title">
            <Link to={link}>{title || "Produktnamn"}</Link>
          </h2>
          <p className="hero-text">{text || "Ingen beskrivning tillgänglig."}</p>
        </div>
      </fieldset>
    </article>
  );
}

export default Hero;
