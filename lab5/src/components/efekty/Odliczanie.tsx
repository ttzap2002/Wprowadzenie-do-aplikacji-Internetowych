import React, { useEffect, useState } from "react";

const Odliczanie: React.FC = () => {
  const [time, setTime] = useState(15.0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 0.1;
          return newTime > 0 ? newTime : 0;
        });
      }, 100);
    }

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [running, time]);

  const disabled = time === 0;

  const handleClick = () => {
    if (disabled) return;
    setRunning((prev) => !prev);
  };

  const buttonLabel = disabled
    ? "Odliczanie zakończone"
    : running
    ? "STOP"
    : "START";

  return (
    <div>
      <div>Odliczanie: {time.toFixed(1)} sek</div>
      <button onClick={handleClick} disabled={disabled}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default Odliczanie;
