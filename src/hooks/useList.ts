import { Dispatch, SetStateAction, useState } from "react";

export default function useList<T>(init: T[]): {
    list: T[],
    add: (element: T)=>T,
    clear: ()=>boolean,
    replace: (index: number, value: T)=>T,
    setList: Dispatch<SetStateAction<T[]>>,
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

    const replace = (index: number, value: T): T => {
        const copyList = list.slice();
        copyList[index] = value;
        setList(copyList);
        return value;
    }

    return {list, add, clear, replace, setList}
}