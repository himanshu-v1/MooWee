import ICard from "@/ui/card/typeCard";
// import { setCards } from "../feature/card/cardSlice";
import { getWallData } from "./api";
import { toast } from "react-toastify";
import { cards } from "@/test/data/card";
// import { useAppStore } from "../hooks";

export const fetchData = async (): Promise<ICard[]> => {
    try {
        const data = await getWallData();
        if(data.msg.toLowerCase() === 'success') {
            return data.data;
        }
        return [];
    } catch (err) {
        console.log(err);
        toast.error("Server unreachable! Enjoy DUMDUM Data!");
        return [...cards, ...cards];
    }
};
