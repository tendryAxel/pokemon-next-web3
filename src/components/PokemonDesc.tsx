import pokemonType from "@/classes/pokemon"
import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"

interface Props {
    pokemon: pokemonType
}

const PokemonDesc: FC<Props> = ({ pokemon }) => {
    return (
        <Card
            direction="row"
            overflow='hidden'
            variant='outline'
            w="19em"
            >
            <Image
                objectFit='cover'
                src={pokemon.sprite}
                alt='Pokemon fa miandry kely'
                w="65%"
            />

            <Stack w="35%">
                <CardBody>
                <Heading whiteSpace="nowrap"size='md'>{pokemon.name}</Heading>
                </CardBody>

                <CardFooter>
                <Link href={`client/${pokemon.id}`}>
                    <Button variant='solid' colorScheme='blue'>
                        Details
                    </Button>
                </Link>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default PokemonDesc