import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import Logo from "../Layout/Logo";

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü Aç/Kapat
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Menü Butonu - Sol Üst Köşe */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>

      {/* Menü İçeriği */}
      <div ref={menuRef} className={`${styles.menuContainer} ${menuOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={toggleMenu}>
          ×
        </button>

        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/list" onClick={toggleMenu}>
                Portfölyo
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>
                İletişim
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footer}>
          <p>© 2025 xfotografcilik</p>
        </div>
      </div>
    </>
  );
}

export default Menu;
