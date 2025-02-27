import { useState, useEffect, useCallback } from "react";

const useMobileDetection = (): boolean => {
  const getIsMobile = useCallback(
    () => /android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768,
    []
  );

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getIsMobile]);

  return isMobile;
};

export default useMobileDetection;
