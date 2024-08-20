import React, { useEffect, useState } from "react";
import "./Traffic.css";

const Traffic = () => {
  const [currentLight, setCurrentLight] = useState(0);

  function getDelay(i) {
    if (i === 0) return 3000;
    if (i === 1) return 500;
    else {
      return 4000;
    }
  }

  useEffect(() => {
    let delay = getDelay(currentLight);

    let intervalId = setInterval(() => {
      setCurrentLight((prev) => (prev + 1) % 3);
    }, delay);

    return () => clearInterval(intervalId);
  }, [currentLight]);

  return (
    <div className="traffic-light">
      <p
        style={{ backgroundColor: `${currentLight === 0 ? "green" : ""}` }}
      ></p>
      <p
        style={{ backgroundColor: `${currentLight === 1 ? "yellow" : ""}` }}
      ></p>
      <p style={{ backgroundColor: `${currentLight === 2 ? "red" : ""}` }}></p>
    </div>
  );
};

export default Traffic;
