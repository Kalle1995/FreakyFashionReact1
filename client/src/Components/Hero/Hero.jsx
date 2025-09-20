import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero({ image, title, text, link }) { // Props för att göra komponenten återanvändbar. funktion som ta emot props
  return (
    <article className="hero-article">
      <fieldset className="hero-head">
        <Link to={link}>
          <img
            className="hero-image"
            src={image} 
            alt={title} 
          />
        </Link>
        <div className="hero-text-container">
          <h2 className="hero-title">
            <Link to={link}>{title}</Link>
          </h2>
          <p className="hero-text">{text}</p>
        </div>
      </fieldset>
    </article>
  );
}

export default Hero;
