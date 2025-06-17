import Image from "next/image";
import Rating from "../rating/rating";
import "./card.scss";
import { useEffect, useState } from "react";
import ICard from "./typeCard";

export default function Card({ cardData } : { cardData: ICard }) {
  const [data, setData] = useState<ICard>({} as ICard);
  const [time, setTime] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [timer, setTimer] = useState(setInterval(()=>{}, 0));
  let inte = 0;

  useEffect(() => {
    setData(cardData);
  }, []);

  useEffect(()=>{
    manageTimer();
  },[isMouseIn]);

  useEffect(()=>{
    if(time >= data.time) {
      clearInterval(timer); 
    }
  },[time])

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

  const handleMouse = (mouseIn: boolean) => {
    setIsMouseIn(mouseIn);
    const ele = document.querySelector(".page") as HTMLElement;
    if(mouseIn) {
      ele?.style?.setProperty("--image", `url(${cardData.poster})`);
      ele?.classList.add("animate");
    } else {
      ele?.style?.setProperty("--image", ``);
      ele?.classList.remove("animate");
    }
  };

  return (
    <div className="card">
      <a href={`/discussion/${data.id}`} target="_self" className="card-content" 
        onMouseEnter={() => {handleMouse(true)}} 
        onMouseLeave={() => {handleMouse(false)}} >

        <section className="art">
          <Image className="poster" src={data.poster || "/img/no-poster.png"} width={100} height={100} alt="" />
        </section>
        <section className="info">
          <h2 className="title">
            <span className="name">{data.title}</span>
            <span className="year">({data.year})</span>
          </h2>
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
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span>{time || data.time || "--"}</span> min
          </span>
        </section>
      </a>
    </div>
  );
}