import React, { useEffect, useState } from "react";

const Licznik: React.FC = () => {
  // Podczas inicjalizacji stanu próbujemy odczytać wartość z localStorage
  const [count, setCount] = useState<number>(() => {
    // W momencie tworzenia komponentu sprawdzamy czy localStorage ma zapisaną wartość
    const saved = localStorage.getItem("licznik-wartosc");
    // Jeśli jest zapisana wartość, parsujemy ją do liczby, w przeciwnym razie ustawiamy 0
    return saved ? parseInt(saved, 10) : 0;
  });

  // Kiedy wartość stanu count się zmieni, zapisujemy ją do localStorage
  useEffect(() => {
    localStorage.setItem("licznik-wartosc", count.toString());
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Licznik z localStorage</h2>
      <p>Aktualna wartość: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Zwiększ</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Zmniejsz</button>
    </div>
  );
};

export default Licznik;
