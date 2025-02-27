import React, { useEffect, useState, useMemo } from "react";
import styles from "./SlideAlert.module.scss";
import useMobileDetection from "../../hooks/useMobileDetection";

interface AlertProps {
  direction: "vertical" | "horizontal";
  storageKey: string;
}

const SlideAlert: React.FC<AlertProps> = ({ direction, storageKey }) => {
  const isMobile = useMobileDetection();
  const [isVisible, setIsVisible] = useState(false);

  // Mesajı belirleme işlemi gereksiz renderları önlemek için useMemo ile optimize edildi
  const message = useMemo(
    () => (direction === "vertical" ? "Swipe up or down" : "Swipe left or right"),
    [direction]
  );

  useEffect(() => {
    if (!sessionStorage.getItem(storageKey)) {
      sessionStorage.setItem(storageKey, "true");
      setIsVisible(true);
    }
  }, [storageKey]);

  if (!isMobile || !isVisible) return null;

  return <div className={styles.slideAlert}>{message}</div>;
};

export default SlideAlert;
