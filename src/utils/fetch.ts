import pokemonType from "@/classes/pokemon";
import Type from "@/classes/type";

export const fetchPokemon = async (url: string): Promise<pokemonType> => {
    const jsonResult: Promise<{
        id: number,
        name: string,
        sprites:{front_default: string},
        types: Type[]
    }> = (await fetch(url)).json();

    console.log(jsonResult);

    return new pokemonType(
        (await jsonResult).id,
        (await jsonResult).name,
        (await jsonResult).sprites.front_default,
        (await jsonResult).types
    );
}