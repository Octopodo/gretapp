import { gameConfigStore } from "@/stores";
import {
    CircledFrame,
    LeafsFrame,
    WoodenFrame,
    FancyFrame,
    DicksFrame,
    NaziFrame,
    TextFrame
} from './frames';

function useGetFrame(based = false) {
    const boardCount = gameConfigStore().boardCount;
    if(based){
        return boardCount % 3 == 0 ? DicksFrame : boardCount % 3 == 1 ? NaziFrame : TextFrame;
    }
    return boardCount % 4 == 0 ? WoodenFrame : boardCount % 4 == 1 ? CircledFrame : boardCount % 4 == 2 ? LeafsFrame : FancyFrame;
}

export { useGetFrame }