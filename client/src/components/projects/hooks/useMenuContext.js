import React, { useEffect, useState } from "react";

const useMenuContext = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};

export default useMenuContext;
