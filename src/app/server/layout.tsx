import { Flex, Text } from "@chakra-ui/react";

const layout = async ({ children } : { children: React.Component }) => {
    return (
        <>
            <Flex
                position="sticky"
                justifyContent="center"
                top="0"
                zIndex="1"
                p="2em"
                bgColor="gold">
                <Text fontSize="3em">All pokemon :D</Text>
            </Flex>
            {children}
        </>
    )
}

export default layout