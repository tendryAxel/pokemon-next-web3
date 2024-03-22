"use client"

import pokemonType from "@/classes/pokemon"
import { fetchPokemon } from "@/utils/fetch"
import { Container, Flex, Heading, Image, SimpleGrid, Stack, StackDivider, Text, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default (params: { params: {id: number} }) => {
    const [ pokemon, setPokemon ] = useState<pokemonType>();

    useEffect(()=>{
        fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${params.params.id}`).then(e=>{
            setPokemon(e)
        })
    }, [])

    return (
        <Container maxW={'5xl'} py={12} boxShadow="1px 1px 10px">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Flex>
              <Image
                rounded={'md'}
                alt={`Misy sary pokemon ${pokemon?.name} eto fa miandry kely`}
                src={pokemon?.sprite}
                objectFit={'cover'}
                boxSize="300px"
              />
            </Flex>
            <Stack spacing={5}>
              <Heading>{pokemon?.name}</Heading>
              <Text color={'gray.500'} fontSize={'lg'}>
                id: {pokemon?.id}
              </Text>
              <Text
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
                rounded={'md'}>
                Type
              </Text>
              <Stack
                spacing={4}
                divider={
                  <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
                }>
                    Text
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )
}