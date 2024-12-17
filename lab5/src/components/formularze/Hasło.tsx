import React, { useState } from "react";

const Haslo = () => {
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  let komunikat = "";
  if (!haslo && !powtorzHaslo) {
    komunikat = "Proszę wprowadzić hasło";
  } else if (haslo && powtorzHaslo && haslo !== powtorzHaslo) {
    komunikat = "Hasła nie są zgodne";
  }
  // Jeśli hasła identyczne i niepuste - komunikat pozostaje pusty

  return (
    <div>
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
      <div>{komunikat}</div>
    </div>
  );
};

export default Haslo;
