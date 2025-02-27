import React, { useEffect, useRef, useState } from "react";
import styles from "./MouseFollower.module.scss";

function MouseFollower() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const isAnimating = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const speed = 0.15; // Daha doğal bir hareket için düşük hız

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };

      if (!isAnimating.current) {
        isAnimating.current = true;
        requestAnimationFrame(animateCursor);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Hover edilebilen öğeleri seç
    const hoverElements = document.querySelectorAll(".mouse-hover");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const animateCursor = () => {
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
    }

    if (Math.abs(mousePos.current.x - cursorPos.current.x) > 0.1 || Math.abs(mousePos.current.y - cursorPos.current.y) > 0.1) {
      requestAnimationFrame(animateCursor);
    } else {
      isAnimating.current = false;
    }
  };

  return (
    <div
      className={`${styles.mouseFollower} ${isHovering ? styles.hovering : ""}`}
      ref={cursorRef}
    >
      <div className={styles.label}>
        <span>Tıkla</span>
      </div>
    </div>
  );
}

export default MouseFollower;
