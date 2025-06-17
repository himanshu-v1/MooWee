"use client";
import SubNav from "@/ui/subNav/subnav";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ slug: string; }>;}) {
    const { slug } = use(params);

    const getNavItems = () => [<i key="home" className="fa-solid fa-house"></i>];

    return (
        <>
            <SubNav list={getNavItems()} />
            <div>
                <h1>Discussion: {slug}</h1>
            </div>
        </>
    );
}