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
    
    const loadData = async () => {
        const data = await fetchData('movies');
        if (data.length) {
            store.current?.dispatch(setCards(data));
        }
    };

    useEffect(() => {    
        loadData();
    }, []);
    
    return <Provider store={store.current}>{children}</Provider>;
}