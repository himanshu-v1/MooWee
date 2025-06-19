"use client";
import Card from "@/ui/card/card";
import SubNav from "@/ui/subNav/subnav";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { getWallData } from "@/lib/api";
import { setCards } from "@/lib/feature/card/cardSlice";
import { toast } from "react-toastify";
import { cards } from "@/test/data/card";
import ICard from "@/ui/card/typeCard";
import './wall.scss';

export default function Landing() {
    // const dispatch = useAppDispatch();
    const store = useAppStore();
    const cardsState = useAppSelector(state => state.cards);
    const wallRef = useRef<HTMLDivElement>(null);

    const fetchData = () => {
        getWallData().then((data) => {
        if(data.msg.toLowerCase() === 'success') {
            setData(data.data);
        }
        }).catch((err) => {
            console.log(err);
            toast.error("Server unreachable! Enjoy DUMDUM Data!");
            setData([...cards, ...cards]);
        });
    };

    const setData = (data: ICard[]) => {
        store.dispatch(setCards(data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <SubNav />
            <div className="wall" ref={wallRef}>
                { 
                    cardsState.map((card, index) => (
                        <Card key={index} cardData={card}/>
                    ))
                }
            </div>
        </>
    );
}