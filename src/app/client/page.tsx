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
            result.push(await fetchPokemon(e.url));
        })
        return result
    }

    useEffect(()=>{
        setPokemons([])
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=2")
            .then(result=>result.json())
            .then(result=>{
                const resultUsable: Array<{name: string, url: string}> = result.results;
                for (const r of resultUsable){
                    fetch(r.url)
                        .then(result=>result.json())
                        .then(result=>{
                            const pokemonsCopy = pokemons
                            pokemonsCopy.push(new pokemonType(result.id, result.name, result.sprites.front_default))
                            setPokemons(pokemonsCopy)
                            console.log(result);
                        })
                        .catch(err=>console.error(err))
                }
                console.log(result.results);
            })
            .catch(err=>console.error(err))
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