"use client";
import { useEffect } from "react";
import './app.scss';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/movies");
    }, 3500);
  }, [])

  return (
    <div className="page">
      <h1 className="logo">{`< MooWee >`}</h1>
    </div>
  );
}
