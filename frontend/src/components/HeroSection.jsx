import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import backgroundImage from "../img/bg.png";

const HeroSection = () => {
    return (
        <Box
            bg={`url(${backgroundImage})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            color="white"
            textAlign="center"
            p={40}
            borderRadius="md"
            boxShadow="lg"
        >
            <VStack spacing={4} align="start">
                <Heading as="h1" size="2xl">
                    Welcome To <span style={{ color: 'yellow' }}>Boo</span>k <span style={{ color: 'yellow' }}>M</span>anagement
                </Heading>
                <Text fontSize="xl">
                    Find the best and free book collection only here.
                </Text>
                <Button colorScheme="yellow" size="lg">
                    Find Now
                </Button>
            </VStack>
        </Box>
    );
};

export default HeroSection;
