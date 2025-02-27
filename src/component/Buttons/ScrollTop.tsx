import React, { useEffect, useState, useCallback } from "react";
import styles from "./ScrollTop.module.scss";

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 200);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.scroll} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
      onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
      role="button"
      aria-label="Scroll to Top"
    >
      ▲
    </button>
  );
};

export default ScrollTop;
