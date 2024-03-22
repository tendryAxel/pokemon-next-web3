import Type from "./type";

export default class pokemonType {
    id: number;
    name: string;
    sprite: string;
    type: Type[];
    constructor(id: number, name: string, sprite: string, type: Type[]){
        this.id = id;
        this.name = name;
        this.sprite = sprite;
        this.type = type;
    }
};