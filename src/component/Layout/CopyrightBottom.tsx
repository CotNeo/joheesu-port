import React from "react";

function CopyrightBottom() {
  return (
    <div
      style={{
        position: "relative",
        height: "12vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.05)", // Hafif gri tonlu arka plan
      }}
    >
      <span
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 1rem)", // Daha dengeli font ölçeklendirme
          fontWeight: "500",
          opacity: "0.8",
          letterSpacing: "0.5px",
          transition: "opacity 0.3s ease-in-out",
          cursor: "default",
          textAlign: "center",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) =>
          (e.currentTarget.style.opacity = "1")
        }
        onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) =>
          (e.currentTarget.style.opacity = "0.8")
        }
      >
        © {new Date().getFullYear()} CotNeo. All Rights Reserved
      </span>
    </div>
  );
}

export default CopyrightBottom;
