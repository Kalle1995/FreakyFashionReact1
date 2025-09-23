import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="list-container">
        <ul className="list">
          <li className="title">Shopping</li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Vinterjackor</Link></li> {/* inget kommer att hända när man klicka på denna länk för att med e.preventDefault() kommer vi att ignoera denna  */}
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Pufferjackor</Link></li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Kappa</Link></li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Trenchcoats</Link></li>
        </ul>
        <ul className="list">
          <li className="title">Mina Sidor</li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Mina Ordrar</Link></li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Mitt Konto</Link></li>
        </ul>
        <ul className="list">
          <li className="title">Kundtjänst</li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Returnpolicy</Link></li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Integritetspolicy</Link></li>
        </ul>
      </div>
      <div className="Company">&copy; Freaky Fashion</div>
    </footer>
  );
}

export default Footer;
