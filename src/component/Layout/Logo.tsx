import React from "react";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "fixed",
        top: "2vh",
        zIndex: 1000,
      }}
    >
      <span
        style={{
          color: "#fff",
          mixBlendMode: "difference",
          fontSize: "clamp(2rem, 2.5vw, 2.8rem)", // Daha iyi responsive font büyüklüğü
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          transition: "opacity 0.3s ease-in-out",
          padding: "5px 10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)", // Beyaz sayfalarda görünürlüğü artırır
          borderRadius: "8px",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) =>
          (e.currentTarget.style.opacity = "0.8")
        }
        onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) =>
          (e.currentTarget.style.opacity = "1")
        }
      >
        X Fotoğrafçılık
      </span>
    </div>
  );
}

export default Logo;
