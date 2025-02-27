import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.scss";
import headerStyles from "../../component/Layout/ProjectHeader.module.scss";
import Header from "../../component/Layout/ProjectHeader";
import useMobileDetection from "../../hooks/useMobileDetection";

function Contact() {
  const isMobile = useMobileDetection();

  useEffect(() => {
    const body = document.querySelector("body");
    const header = document.querySelector(`.${headerStyles.projectHeader}`) as HTMLElement;

    if (header) {
      body.style.backgroundColor = "#f5f5f5";
      header.style.position = "fixed";
      header.style.backgroundColor = "#f5f5f5";
    }

    return () => {
      if (header) {
        body.style.backgroundColor = "";
        header.style.position = "";
        header.style.backgroundColor = "";
      }
    };
  }, []);

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const email = "xfotografcilik@xxx.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        if (isMobile) {
          alert("Copied to clipboard");
        } else {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <Header title="CONTACT" />

      <div className={styles.container}>
        <img className={styles.profileImg} src={`${process.env.PUBLIC_URL}/imgs/contact_profile.jpg`} alt="Profile" />

        <div className={styles.side}>
          <div className={styles.info}>
            <p>Photographer based in İstanbul</p>
          </div>

          <div className={styles.linkBox}>
            <div className={styles.linkType}>
              <span>E-mail</span>
              <span>WhatsApp</span>
            </div>
            <div className={styles.link}>
              <button onClick={copyToClipboard} className="pointer">
                xfotografcilik@xxx.com
              </button>
              {!isMobile && copySuccess && <span className={styles.copySuccess}>Copied to clipboard</span>}
              <Link to="https://wa.me/905555555555" target="_blank" className="pointer">
                <span>WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© 2025 by xfotografcilik</span>
      </footer>
    </>
  );
}

export default Contact;
