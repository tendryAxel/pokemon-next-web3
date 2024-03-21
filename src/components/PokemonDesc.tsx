import pokemonType from "@/classes/pokemon"
import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"

interface Props {
    pokemon: pokemonType
}

const PokemonDesc: FC<Props> = ({ pokemon }) => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '400px' }}
                src={pokemon.sprite}
                alt='Pokemon fa miandry kely'
            />

            <Stack>
                <CardBody>
                <Heading size='md'>{pokemon.name}</Heading>

                <Text py='2'>
                    id: {pokemon.id}
                </Text>
                </CardBody>

                <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                    Details
                </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default PokemonDesc