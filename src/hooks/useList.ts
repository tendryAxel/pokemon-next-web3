import { useState } from "react";

export default function useList<T>(init: T[]): {
    list: T[],
    add: (element: T)=>T,
    clear: ()=>boolean,
} {
    const [list, setList] = useState(init);

    const add = (element: T): T => {
        const copyList = list.slice();
        copyList.push(element);
        setList(copyList);
        return element;
    }

    const clear = () => {
        setList([])
        return true
    }

    return {list, add, clear}
}