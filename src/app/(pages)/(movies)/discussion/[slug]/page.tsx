"use client";
import { useAppSelector } from "@/lib/hooks";
import { ICard, IAddnDetails } from "@/types/typeCard";
import SubNav from "@/ui/subNav/subnav";
import { RefObject, use, useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import './discussion.scss';
import { fetchData } from "@/lib/api/helper";
import Rating from "@/ui/rating/rating";

interface deps {
    data: object;
    details: ICard | undefined
}

export default function Page({ params }: { params: Promise<{ slug: string; }>;}) {
    // const router = useRouter();
    const prodrRef = useRef<HTMLUListElement>(null),
        castRef = useRef<HTMLUListElement>(null),
        prodRef = useRef<HTMLUListElement>(null),
        discMain = useRef<HTMLDivElement>(null);
    const { slug } = use(params);
    const [details, setDetails] = useState<ICard>();
    const [additionalDetails, setAdditionalDetails] = useState<IAddnDetails>();
    const [isLoading, setIsLoading] = useState(true);
    const data = useAppSelector(state => state.cards);
    const previousDep = useRef<deps>({data: {}, details: undefined});

    useEffect(() => {
        setBg(window.page?.current);
        fetchData('movie', { id: slug }, 'addn').then(res => {
            setAdditionalDetails({...res});
            document.dispatchEvent(new CustomEvent('setData'));
        });
    }, []);

    useEffect(() => {
        if(previousDep.current.data !== data) {
            setDetails(data.find((movie: ICard) => movie.id === slug));
        }
        if (previousDep.current.details !== details) {
            console.log('details');
        }
        previousDep.current = { data, details };
    }, [data, details]);

    const getHtml = (propt: string, ref?: RefObject<HTMLUListElement | null>, setLoaded?: boolean) => {
        // let htmlElement = document.createElement('div');
        // htmlElement.innerHTML = htmlString;
        const parser = new DOMParser();
        const doc = parser.parseFromString(propt, 'text/html');

        if(setLoaded) {
            finisher();
        }

        if(ref && ref.current) {
            ref.current!.innerHTML = doc.body.innerHTML;
            return ref.current!.innerHTML;
        }
        return doc.body.innerHTML || '';
    }

    const finisher = () => {
        const ele = discMain.current!;
        setTimeout(() => {
            ele.querySelectorAll('sup').forEach(e => {
                e.parentElement?.removeChild(e);
            });
            setIsLoading(false);
            addEffect();
        }, 400);
    }

    const addEffect = () => {
        window.addEventListener('scroll', () => {
            const top = window.page.current.getBoundingClientRect().top;
            console.log(top);
            if(top < 80) {
                discMain.current?.classList.add("fixed-header");
            } else {
                discMain.current?.classList.remove("fixed-header");
            }
        });
    }

    const setBg = (ele: HTMLDivElement) => {
        ele?.classList?.remove("animate", "static");
        ele?.style?.setProperty("--image", `background: white`);
    }

    const getNavItems = () => [<i key="home" onClick={() => window.location.href = "/wall"} tabIndex={0} className="fa-solid fa-house"></i>];

    return (
        <>
            <SubNav list={getNavItems()} />
            <div className={isLoading ? "" : "display-none"}>Loading...</div>
            <div className={`discussion ${isLoading ? "display-none" : ""}`} ref={discMain}>
                <section className="details-wrapper">
                    <div className="image-wrapper">
                        <Image src={details?.poster || process.env.NEXT_PUBLIC_DUMMY_IMG || ''} 
                            alt={details?.title || ''} width={100} height={100}/>
                    </div>
                    <div className="content-wrapper">
                        <p>{details?.year}</p>
                        <h3>{details?.title}</h3>
                        <div className="rating-wrapper">
                            <span>
                                <Rating rating={details?.rating ? parseFloat(details?.rating.split("/")[0]) : 0} />
                            </span>
                            <span className="text">{details?.rating}</span>
                        </div>
                        <p><span className="title">Director:</span>{details?.director}</p>
                        <p><span className="title">Genre:</span>{details?.genre}</p>
                        <div className="producer-wrapper">
                            <span className="title">Producer:</span>
                            <span ref={prodrRef}>
                                { 
                                    additionalDetails?.producer && getHtml(additionalDetails?.producer || "", prodrRef) 
                                }
                            </span>
                        </div>
                        <div className="cast-wrapper">
                            <span className="title">Cast:</span>
                            <span ref={castRef}>
                                { additionalDetails?.cast && getHtml(additionalDetails?.cast || "", castRef) }
                            </span>
                        </div>
                        <div className="production-wrapper">
                            <span className="title">Production:</span>
                            <span ref={prodRef}>
                                { additionalDetails?.production && getHtml(additionalDetails?.production || "", prodRef, true) }
                            </span>
                        </div>
                    </div>
                </section>
                <section className="plot-wrapper" dangerouslySetInnerHTML={{ __html: getHtml(additionalDetails?.plot || "") }}>
                    {/* { getHtml(additionalDetails?.plot || "") } */}
                </section>
            </div>
        </>
    );
}