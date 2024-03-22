"use client"

import pokemonType from "@/classes/pokemon";
import PokemonDesc from "@/components/PokemonDesc"
import useList from "@/hooks/useList";
import { fetchPokemon } from "@/utils/fetch";
import { Button, Divider, Flex, list } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { FaPlus, FaMinus } from "react-icons/fa";

interface requestResult {name: string, url: string};

export default () => {
    const pokemon = useList<pokemonType>([])
    const [ page, setPage ] = useState(0)

    const fetchResul = async (): Promise<requestResult[]> => {
        const jsonResult = (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(page || 0) * 50}`)).json()
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
    }, [page])

    useEffect(()=>{
        console.log("new liste " + pokemon.list.length);
    }, [pokemon.list])

    return (
        <Flex
            direction="row"
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent="space-evenly"
            gap="1em">
            <Divider w="90%" />
            {
                pokemon.list.map((pokemon)=>{
                    return <PokemonDesc key={pokemon.name} pokemon={pokemon} />
                })
            }
            <Flex>
                <Button leftIcon={<FaMinus />} onClick={()=>setPage(page - 1)} />
                <Button leftIcon={<FaPlus />} onClick={()=>setPage(page + 1)} />
            </Flex>
        </Flex>
    )
}