"use client";
import Card from "@/ui/card/card";
import SubNav from "@/ui/subNav/subnav";
import { useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import '../movies/wall.scss';

export default function TvWall() {
    const cardsState = useAppSelector(state => state.cards);
    const wallRef = useRef<HTMLDivElement>(null);

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