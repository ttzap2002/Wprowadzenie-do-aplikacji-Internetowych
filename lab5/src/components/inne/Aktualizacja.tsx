import React, { useState } from "react";

const Aktualizacja = () => {
  const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

  const zmienCene = () => {
    setProdukt((prevState) => ({
      ...prevState,
      cena: 100,
    }));
  };

  return (
    <div>
      <div>
        Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
      </div>
      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
};

export default Aktualizacja;
