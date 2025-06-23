import { RefObject } from "react";

declare global {
    interface Window {
        page: RefObject<HTMLDivElement>;
        // page: HTMLDivElement;
    }
}

export {};