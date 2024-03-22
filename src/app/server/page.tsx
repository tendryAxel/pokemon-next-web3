import pokemonType from "@/classes/pokemon";
import Type from "@/classes/type";
import PokemonDesc from "@/components/PokemonDesc";
import { fetchPokemon } from "@/utils/fetch";
import { Divider, Flex } from "@chakra-ui/react"

interface requestResult {name: string, url: string};

export default async () => {
    const fetchResul = async (): Promise<requestResult[]> => {
        const jsonResult = (await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")).json()
        const allResult: requestResult[] = (await jsonResult).results
        return allResult
    }

    const fetchPokemons = async () => {
        const result: pokemonType[] = [];
        for (const e of await fetchResul()) {
            result.push(await fetchPokemon(e.url));
        }
        return result
    }

    return (
        <Flex
            direction="row"
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent="space-evenly"
            gap="1em">
            <Divider w="90%" />
            {
                (await fetchPokemons()).map((pokemon)=>{
                    return <PokemonDesc key={pokemon.name} pokemon={pokemon} />
                })
            }
        </Flex>
    )
}