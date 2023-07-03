import { useEffect, useState } from "react";

const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const hendleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", hendleResize);
    return () => window.removeEventListener("resize", hendleResize);
  }, []);

  return width;
};

export default useWindowResize;
