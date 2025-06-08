// import Image from "next/image";
'use client';
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/landing";
    }, 1000);
  }, [])

  const handleClick = () => {
    window.location.href = "/landing";
  };

  return (
    <div className={styles.page}>
      <h1 onClick={handleClick}>Moowee</h1>
    </div>
  );
}
