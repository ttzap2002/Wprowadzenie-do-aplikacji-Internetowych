import React, { useEffect, useState } from "react";

const Tytul: React.FC = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = title || "Domyślny tytuł";
  }, [title]);

  return (
    <div>
      <label>
        Wpisz tytuł strony:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Tytul;
