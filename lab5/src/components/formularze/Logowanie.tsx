import React, { useState } from "react";

const Logowanie = () => {
  const [nazwaUzytkownika, setNazwaUzytkownika] = useState("");
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  const wszystkieWypelnione = nazwaUzytkownika && haslo && powtorzHaslo;
  const haslaZgodne = haslo === powtorzHaslo;

  const handleLogin = () => {
    if (wszystkieWypelnione && !haslaZgodne) {
      alert("Hasła nie są zgodne");
    } else if (wszystkieWypelnione && haslaZgodne) {
      alert("Zalogowano poprawnie");
    }
  };

  return (
    <div>
      <div>
        <label>
          Nazwa użytkownika:
          <input
            type="text"
            value={nazwaUzytkownika}
            onChange={(e) => setNazwaUzytkownika(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Hasło:
          <input
            type="text"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Powtórz Hasło:
          <input
            type="text"
            value={powtorzHaslo}
            onChange={(e) => setPowtorzHaslo(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleLogin} disabled={!wszystkieWypelnione}>
        Logowanie
      </button>
    </div>
  );
};

export default Logowanie;
