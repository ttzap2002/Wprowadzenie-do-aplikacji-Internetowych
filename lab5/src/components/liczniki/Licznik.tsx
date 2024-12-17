import React, { useState } from "react";

const Licznik: React.FC = () => {
  const [licznik, setLicznik] = useState(0);

  const dodaj = () => setLicznik(licznik + 1);

  return (
    <div>
      <h2>Licznik</h2>
      <div>Stan licznika: {licznik}</div>
      <button onClick={dodaj}>Dodaj</button>
    </div>
  );
};

export default Licznik;
