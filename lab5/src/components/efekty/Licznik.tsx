import React, { useEffect, useState } from "react";

const Licznik: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log(`Licznik zwiększył się do ${count}`);
  }, [count]);

  return (
    <div>
      <div>Aktualna wartość licznika: {count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Zwiększ licznik
      </button>
    </div>
  );
};

export default Licznik;
