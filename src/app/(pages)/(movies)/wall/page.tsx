"use client";
import Card from "@/ui/card/card";
import SubNav from "@/ui/subNav/subnav";
import { useEffect, useRef } from "react";
// import { cards } from "@/test/data/card";
import { useAppSelector } from "@/lib/hooks";
import './wall.scss';

export default function Landing() {
    // const store = useAppStore();
    // const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards);
    const wallRef = useRef<HTMLDivElement>(null);
    const transition = () => {
        wallRef?.current?.querySelectorAll('.card-content').forEach((card: Element) => {
            const observer = new IntersectionObserver(([entry]) => {
                card.parentElement?.classList.toggle('show', entry.isIntersecting);
                // observer.unobserve(card);
                // if(entry.isIntersecting) {
                //     card.parentElement?.classList.add('show');
                //     observer.unobserve(card);
                // }
            }, { threshold: 0.1 });

            observer.observe(card);
        });
    };

    useEffect(() => {
        transition();
    }, []);

    return (
        <>
            <SubNav />
            <div className="wall" ref={wallRef}>
                { 
                    cards.map((card, index) => (
                        <Card key={index} cardData={card}/>
                    ))
                }
            </div>
        </>
    );
}