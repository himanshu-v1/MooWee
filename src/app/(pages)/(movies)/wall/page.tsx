"use client";
import Card from "@/ui/card/card";
import SubNav from "@/ui/subNav/subnav";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
// import { useSessionStorage } from "@/hooks/useSessionStorage";
import { fetchData } from "@/lib/api/helper";
import { setTvCards } from "@/lib/feature/card/cardTvSlice";
import { ICard } from "@/types/typeCard";
import wallBg from '@public/wall.jpg';
import './wall.scss';

export default function Landing() {
    const [cardsState, setCardsState] = useState<Array<ICard>>([]);
    const [wall, setWall] = useState<string>('');
    const dispatch = useAppDispatch();
    
    // const [wall] = useSessionStorage<string | null>('wall', null);
    const wallState = useAppSelector(state => state.wallState.wall);
    const movieCards = useAppSelector(state => state.cards);
    const tvCards = useAppSelector(state => state.tvCards);
    const wallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ele = window.page?.current;
        ele?.style?.setProperty("--image", `url(${wallBg.src})`);
        ele?.classList?.add('static');
    }, [])

    useEffect(() => {
        setCardsState([] as ICard[]);
        setWall(wallState || '');
    }, [wallState, movieCards, tvCards]);

    useEffect(() => {
        if(wall === 'tv') {
            if(tvCards.length === 0) {
                loadData();
            } else {
                setCardsState(tvCards);
            }
        } else {
            setCardsState(movieCards);
        }
    }, [cardsState, wall]);

    const loadData = async () => {
        const data = await fetchData('tvs');
        if (data.length) {
            dispatch(setTvCards(data));
        }
    };

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