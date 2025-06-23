"use client";
import { useAppSelector } from "@/lib/hooks";
import ICard from "@/ui/card/typeCard";
import SubNav from "@/ui/subNav/subnav";
import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

interface deps {
    data: object;
    details: ICard | undefined
}

export default function Page({ params }: { params: Promise<{ slug: string; }>;}) {
    // const router = useRouter();
    const { slug } = use(params);
    const [details, setDetails] = useState<ICard>();
    const data = useAppSelector(state => state.cards);
    const previousDep = useRef<deps>({data: {}, details: undefined});

    useEffect(() => {
        setBg(window.page?.current);
    }, []);

    useEffect(() => {
        if(previousDep.current.data !== data) {
            setDetails(data.find((movie: ICard) => movie.id === slug));
        }
        if (previousDep.current.details !== details) {
            console.log(details);
        }
        previousDep.current = { data, details };
    }, [data, details]);

    const setBg = (ele: HTMLDivElement) => {
        ele?.classList?.remove("animate", "static");
        ele?.style?.setProperty("--image", `background: white`);
    }

    const getNavItems = () => [<i key="home" onClick={() => window.location.href = "/wall"} tabIndex={0} className="fa-solid fa-house"></i>];

    return (
        <>
            <SubNav list={getNavItems()} />
            <div>
                <section>
                    <Image src={details?.poster || process.env.NEXT_PUBLIC_DUMMY_IMG || ''} 
                        alt={details?.title || ''} width={100} height={100}/>
                </section>
                <h1>Discussion: {slug}</h1>
            </div>
        </>
    );
}