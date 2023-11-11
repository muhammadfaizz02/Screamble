import { Box, Heading, Image, Text, HStack, VStack, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Box
        key={id}
        my={4}
        p={4}
        cursor='pointer'
      >
        <Image w="100%" h={48} objectFit="cover" src={`http://localhost:8000/${image}`} />
        <VStack align="start" mt={2}>
          <Heading size="md" color="white">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {author} {year}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}
