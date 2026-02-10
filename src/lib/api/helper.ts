/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICard, IAddnDetails, initialAddnDetails } from "@/types/typeCard";
// import { setCards } from "../feature/card/cardSlice";
import { getWallData, getMovieData, getWallTvData, getTvData } from "./api";
import { toast } from "react-toastify";
import { cards } from "@/test/data/card";
import { discussions } from "@/test/data/discussion";
// import { Interface } from "readline";
// import { useAppStore } from "../hooks";

export function fetchData(endpoint: string, args?: any): Promise<ICard[]>;
export function fetchData(endpoint: string, args?: any, type?: string): Promise<IAddnDetails>;

export async function fetchData(endpoint: string, args?: any): Promise<ICard[] | IAddnDetails> {
    let endp = undefined;
    let _args = {}
    switch(endpoint) {
        case 'movies':
            endp = getWallData;
            break;
        case 'movie':
            endp = getMovieData;
            _args = {...args};
            break;
        case 'tvs':
            endp = getWallTvData;
            break;
        case 'tv':
            endp = getTvData;
            _args = {...args};
            break;
        default: endp = () => {};
            break;
    }

    try {
        const data = await endp({..._args});
        if(data.msg.toLowerCase() === 'success') {
            return data.data;
        }
        return [];
    } catch (err: any) {
        console.log(err);
        if(err.cause?.status === 500) {
            setTimeout(() => {
                toast.error("Server unreachable! Enjoy DUMDUM Data!");
            }, 3500);
        } else if (err.cause?.status === 204) {
            toast.error(`${err.message}!`);
        } else {
            toast.error("Server unreachable! Enjoy DUMDUM Data!");
        }

        if(endpoint === 'movie') {
            // return {...initialAddnDetails};
            const movieDummyData = {...initialAddnDetails, ...discussions[0]};
            return movieDummyData;
        }
        return [...cards, ...cards];
    }
};

// export const fetch = async (endpoint: string, args?: any) => {
//     return await fetchData(endpoint, args);
// };
