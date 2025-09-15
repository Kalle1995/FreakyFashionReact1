import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="normal-footer">
        <div className="list-container">
          <ul className="list">
            <li className="blod-li">Shopping</li>
            <li><a href="#">Vinterjackor</a></li>
            <li><a href="#">Pufferjackor</a></li>
            <li><a href="#">Kappa</a></li>
            <li><a href="#">Trenchcoats</a></li>
          </ul>
          <ul className="list">
            <li className="blod-li">Mina Sidor</li>
            <li><a href="#">Mina Ordrar</a></li>
            <li><a href="#">Mitt Konto</a></li>
          </ul>
          <ul className="list">
            <li className="blod-li">Kundtjänst</li>
            <li><a href="#">Returnpolicy</a></li>
            <li><a href="#">Integritetspolicy</a></li>
          </ul>
        </div>
        <div className="Company">&copy; Freaky Fashion</div>
      </footer>

      <footer className="small-footer">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {[
            {
              title: "Shopping",
              items: ["Vinterjackor", "Pufferjackor", "Kappa", "Trenchcoats"],
            },
            {
              title: "Mina Sidor",
              items: ["Mina Ordrar", "Mitt Konto"],
            },
            {
              title: "Kundtjänst",
              items: ["Returnpolicy", "Integritetspolicy"],
            },
          ].map((section, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`flush-heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${index}`}
                >
                  {section.title}
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading${index}`}
                data-bs-parent="#accordionFlushExample"
              >
                <ul className="accordion-body">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="Company">&copy; Freaky Fashion</div>
      </footer>
    </>
  );
}

export default Footer;
