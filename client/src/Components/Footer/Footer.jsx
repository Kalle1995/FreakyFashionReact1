import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="list-container">
        <ul className="list">
          <li className="title">Shopping</li>
          <li><Link to="#">Vinterjackor</Link></li>
          <li><Link to="#">Pufferjackor</Link></li>
          <li><Link to="#">Kappa</Link></li>
          <li><Link to="#">Trenchcoats</Link></li>
        </ul>
        <ul className="list">
          <li className="title">Mina Sidor</li>
          <li><Link to="#">Mina Ordrar</Link></li>
          <li><Link to="#">Mitt Konto</Link></li>
        </ul>
        <ul className="list">
          <li className="title">Kundtjänst</li>
          <li><Link to="#">Returnpolicy</Link></li>
          <li><Link to="#">Integritetspolicy</Link></li>
        </ul>
      </div>
      <div className="Company">&copy; Freaky Fashion</div>
    </footer>
  );
}

export default Footer;
