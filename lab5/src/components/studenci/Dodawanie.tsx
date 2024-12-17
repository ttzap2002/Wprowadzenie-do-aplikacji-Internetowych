import React, { useState, FormEvent } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

interface DodawanieProps {
  onAdd: (student: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ onAdd }) => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Walidacja:
    if (!imie.trim() || !nazwisko.trim() || !rocznik.trim()) {
      setError("Wszystkie pola muszą być wypełnione.");
      return;
    }

    const parsedRocznik = parseInt(rocznik, 10);
    if (isNaN(parsedRocznik)) {
      setError("Rocznik musi być liczbą.");
      return;
    }

    const newStudent: Student = {
      imie: imie.trim(),
      nazwisko: nazwisko.trim(),
      rocznik: parsedRocznik,
    };

    onAdd(newStudent);

    // Czyszczenie formularza po dodaniu:
    setImie("");
    setNazwisko("");
    setRocznik("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Imię:
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Nazwisko:
          <input
            type="text"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rocznik:
          <input
            type="text"
            value={rocznik}
            onChange={(e) => setRocznik(e.target.value)}
          />
        </label>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default Dodawanie;
