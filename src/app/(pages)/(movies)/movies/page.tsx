"use client";
import Card from "@/ui/card/card";
import SubNav from "@/ui/subNav/subnav";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchData } from "@/lib/api/helper";
import { setCards } from "@/lib/feature/card/cardTvSlice";
import { ICard } from "@/types/typeCard";
import './wall.scss';

export default function Landing() {
    const [cardsState, setCardsState] = useState<Array<ICard>>([]);
    const dispatch = useAppDispatch();
    const wall = sessionStorage.getItem('wall');    
    const movieCards = useAppSelector(state => state.cards);
    const tvCards = useAppSelector(state => state.tvCards);
    const wallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(wall === 'tv') {
            if(tvCards.length === 0) {
                loadData();
            } else {
                setCardsState(tvCards);
            }
            console.log("tvCards", tvCards);
            console.log("movieCards", movieCards);
        } else {
            setCardsState(movieCards);
        }
    }, [wall, tvCards, movieCards]);

    const loadData = async () => {
        const data = await fetchData('tv');
        console.log("data", data);
        if (data.length) {
            dispatch(setCards(data));
        }
    };

    return (
        <>
            <SubNav />
            <div className="wall" ref={wallRef}>
                { 
                    cardsState && cardsState.map((card, index) => (
                        <Card key={index} cardData={card}/>
                    ))
                }
            </div>
        </>
    );
}