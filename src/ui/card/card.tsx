import Image from "next/image";
import Rating from "../rating/rating";
import "./card.scss";
import { useEffect, useState, useRef } from "react";
import { ICard } from "../../types/typeCard";
import { useRouter } from "next/navigation";

export default function Card({ cardData } : { cardData: ICard }) {
  const router = useRouter();
  const [data, setData] = useState<ICard>({} as ICard);
  const [time, setTime] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [timer, setTimer] = useState(setInterval(()=>{}, 0));
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const previousDeps = useRef({ isMouseIn, time });
  let inte = 0;

  useEffect(() => {
    setData(cardData);
    transition();
    setTimeout(animateScroll, 500);
  }, []);

  useEffect(() => {
    if(previousDeps.current.isMouseIn !== isMouseIn) {
      manageTimer();
      handleMouse(isMouseIn);
    } else if (previousDeps.current.time !== time) {
      if(time >= data.time) {
        clearInterval(timer); 
      }
    }

    previousDeps.current = { isMouseIn, time };
  }, [isMouseIn, time])

  const incr = () => {
    const t = setInterval(() => {
          setTime(++inte);
        }, 1);
    setTimer(t);
  }

  const manageTimer = () => {
    if (time <= data.time && isMouseIn) {
      incr();
    } else {
      clearInterval(timer);
      setTime(0);
    }
  };

  const handleMouse = (mouseIn?: boolean) => {
    const ele = window.page?.current;
    let leaveId: ReturnType<typeof setTimeout> | undefined = undefined;

    ele?.style?.setProperty("--image", `background: white`);

    if(!leaveId) {
      leaveId = setTimeout(() => {
        if(mouseIn) {
          ele?.style?.setProperty("--image", `url(${cardData.poster})`);
          ele?.classList.remove("static");
          ele?.classList.add("animate");
          clearTimeout(leaveId);
        }
        else {
          ele?.style?.setProperty("--image", ``);
          ele?.classList.add("static");
          ele?.classList.remove("animate");
        }
      }, 400);
    }
  };

  const transition = () => {
    const observer = new IntersectionObserver(([entry]) => {
        entry.target.parentElement?.classList.toggle('show', entry.isIntersecting);
        // observer.unobserve(card);
    }, { threshold: 0.3 });
    observer.observe(cardRef.current!);
  };

  const animateScroll = () => {
    const titleEl = cardRef.current!.querySelector('.name span')!;
    const elWidth = titleEl.getBoundingClientRect().width;
    const parentWidth = cardRef.current!.getBoundingClientRect().width;

    if(elWidth > parentWidth) {
      titleEl.parentElement?.classList.add('scroll');
    }
  };

  const redirect = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/discussion/${data.id}`);
  }

  return (
    <div className="card">
      <a href="#" target="_self" className="card-content"
        onClick={(e) => redirect(e)}
        onMouseEnter={() => {setIsMouseIn(true);}}
        onMouseLeave={() => {setIsMouseIn(false);}}
        onMouseOver={() => {setIsMouseIn(true);}} ref={cardRef} >

        <section className="art">
          <Image className="poster" src={data.poster || process.env.NEXT_PUBLIC_DUMMY_IMG || ''} 
            width={100} height={100} alt="" />
        </section>
        <section className="info">
          <h2 className="title">
            <span className="name">
              <span>{data.title}</span>
            </span>
            <span className="year">({data.year})</span>
          </h2>
          <section className="details">
            <i className="director">
              <i className="fa-solid fa-clapperboard"></i>
              {data.director}
            </i>
            <span className="rating">
              <Rating rating={data.rating ? parseFloat(data.rating.split("/")[0]) : 0} />
              <span className="text">{data.rating}</span>
            </span>
            <span className="genre">{ Array.isArray(data.genre) ? data.genre?.join(", ") : data?.genre}</span>
            <span className="runtime">
              {
                sessionStorage.getItem("wall") !== 'tv' ? 
                  <>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <span>{time || data.time || "--"}</span> min
                  </>
                : <>
                  <span>{data.episodes || "--"}</span> episodes
                </>
              }
            </span>
          </section>
        </section>
      </a>
    </div>
  );
}