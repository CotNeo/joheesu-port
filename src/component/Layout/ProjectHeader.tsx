import React from "react";
import styles from "./ProjectHeader.module.scss";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.projectHeader}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default Header;
