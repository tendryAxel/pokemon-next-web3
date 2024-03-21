import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
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