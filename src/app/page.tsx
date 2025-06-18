'use client';
import { useEffect } from "react";
import { getWallData } from "@/lib/api";
import { setCards } from "@/lib/feature/card/cardSlice";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/hooks";
import { toast } from "react-toastify";
import { cards } from "@/test/data/card";
import ICard from "@/ui/card/typeCard";
// import Image from "next/image";
// import { useAppDispatch } from "@/lib/hooks";
// import styles from "./page.module.scss";
import './app.scss';

export default function Home() {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const store = useAppStore();

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    getWallData().then((data) => {
      if(data.msg.toLowerCase() === 'success') {
        setData(data.data);
      }
    }).catch((err) => {
      console.log(err);
      toast.error("Server unreachable! Enjoy DUMDUM Data!");
      setTimeout(() => {
        setData(cards);
      }, 4000);
    });
  }, []);

  const setData = (data: ICard[]) => {
    store.dispatch(setCards(data));
    router?.push("/wall");
  };

  return (
    <div className="page">
      <h1 className="logo">{`< MooWee >`}</h1>
    </div>
  );
}
