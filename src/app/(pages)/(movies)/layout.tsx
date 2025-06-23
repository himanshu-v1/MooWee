"use client";
import Footer from "@/ui/footer/footer";
import Header from "@/ui/header/header";
import "./movies.scss";
import { RefObject, useRef } from "react";

export default function Layout({children}:{children:React.ReactNode}) {
    const pageRef = useRef<HTMLDivElement>(null);
    window.page = (pageRef as RefObject<HTMLDivElement>);

    return (
        <>
            <Header />
            <div className={`landing page static`} ref={pageRef}>
                {children}
            </div>
            <Footer />
        </>
    )
}