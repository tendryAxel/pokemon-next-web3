import pokemonType from "@/classes/pokemon";

export const fetchPokemon = async (url: string): Promise<pokemonType> => {
    const jsonResult: Promise<{
        id: number,
        name: string,
        sprites:{front_default: string}
    }> = (await fetch(url)).json();

    return new pokemonType(
        (await jsonResult).id,
        (await jsonResult).name,
        (await jsonResult).sprites.front_default
    );
}