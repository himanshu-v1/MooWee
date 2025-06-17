// import Image from "next/image";
'use client';
import { useEffect } from "react";
import { getWallData } from "@/lib/api";
// import { useAppDispatch } from "@/lib/hooks";
import { setCards } from "@/lib/feature/card/cardSlice";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/hooks";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const store = useAppStore();

  useEffect(() => {
    getWallData().then((data) => {
      if(data.msg.toLowerCase() === 'success') {
        store.dispatch(setCards(data.data));
        router?.push("/wall");
      }
    }).catch(err => console.log(err));
  }, []);

  const handleClick = () => {
    window.location.href = "/wall";
  };

  return (
    <div className={styles.page}>
      <h1 onClick={handleClick}>Moowee</h1>
    </div>
  );
}
