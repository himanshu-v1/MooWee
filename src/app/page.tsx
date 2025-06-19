"use client";
import { useEffect } from "react";
// import Image from "next/image";
// import { useAppDispatch } from "@/lib/hooks";
// import styles from "./page.module.scss";
import './app.scss';

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href="/wall";
    }, 3500);
  }, [])

  return (
    <div className="page">
      <h1 className="logo">{`< MooWee >`}</h1>
    </div>
  );
}
