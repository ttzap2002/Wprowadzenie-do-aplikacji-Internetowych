import React, { useState } from "react";

const Formularz = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Wpisz tekst..."
      />
      <div>{text}</div>
    </div>
  );
};

export default Formularz;
