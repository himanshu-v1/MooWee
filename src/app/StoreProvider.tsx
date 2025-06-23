'use client';
import { fetchData } from "@/lib/api/helper";
import { setCards } from "@/lib/feature/card/cardSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode}) {
    const store = useRef<AppStore>(null);
    
    if (!store.current) {
        store.current = makeStore();
    }
    
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            if (data.length) {
                console.log(data);
                store.current?.dispatch(setCards(data));
            }
        };
        
        loadData();
    }, []);
    
    return <Provider store={store.current}>{children}</Provider>;
}