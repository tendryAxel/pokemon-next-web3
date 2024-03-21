"use client"

import pokemonType from "@/classes/pokemon";
import PokemonDesc from "@/components/PokemonDesc"
import useList from "@/hooks/useList";
import { Divider, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface requestResult {name: string, url: string};

export default () => {
    const pokemon = useList<pokemonType>([])

    const fetchResul = async (): Promise<requestResult[]> => {
        const jsonResult = (await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")).json()
        return (await jsonResult).results
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
        (await fetchResul()).forEach(async (e)=>{
            const pokemonResult = await fetchPokemon(e.url)
            result.push(pokemonResult);
            pokemon.add(pokemonResult);
        })
        return result
    }

    useEffect(()=>{
        pokemon.clear()
        fetchPokemons()
    }, [])

    return (
        <Flex
            direction="column"
            alignItems="center"
            gap="3em">
            <Divider w="90%" />
            {
                pokemon.list.map((pokemon)=>{
                    return <PokemonDesc key={pokemon.id} pokemon={pokemon} />
                })
            }
        </Flex>
    )
}