"use client"

import pokemonType from "@/classes/pokemon";
import PokemonDesc from "@/components/PokemonDesc"
import useList from "@/hooks/useList";
import { Divider, Flex, list } from "@chakra-ui/react"
import { useEffect } from "react"

interface requestResult {name: string, url: string};

export default () => {
    const pokemon = useList<pokemonType>([])

    const fetchResul = async (): Promise<requestResult[]> => {
        const jsonResult = (await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")).json()
        const allResult: requestResult[] = (await jsonResult).results
        return allResult
    }

    const fetchPokemon = async (url: string): Promise<pokemonType> => {
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

    const fetchPokemons = async () => {
        const result: pokemonType[] = [];
        for (const e of await fetchResul()) {
            result.push(await fetchPokemon(e.url));
        }
        return result
    }

    useEffect(()=>{
        const doAction = () => {
            fetchPokemons()
                .then(e=>{
                    console.log("Content du then start");
                    console.log(e)
                    console.log(e.length)
                    console.log(e[0])
                    console.log("Content du then end");
                    return e
                })
                .then((e: pokemonType[])=>{
                    console.log(e);
                    pokemon.setList(e)
                })
        }

        doAction()
        // console.log(pokemon.list);
    }, [])

    useEffect(()=>{
        console.log("new liste " + pokemon.list.length);
    }, [pokemon.list])

    return (
        <Flex
            direction="row"
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent="space-evenly"
            gap="3em">
            <Divider w="90%" />
            {
                pokemon.list.map((pokemon)=>{
                    return <PokemonDesc key={pokemon.name} pokemon={pokemon} />
                })
            }
        </Flex>
    )
}