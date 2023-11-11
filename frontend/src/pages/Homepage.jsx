import { Box, HStack, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
import HeroSection from "../components/HeroSection";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Box w="100vw">
      <HeroSection />
      <Heading as="h2" size="md" color="white" textAlign="center" mt={10}>
        New Collection
      </Heading>
      <HStack spacing={4} justify="center">
        {books?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </HStack>
    </Box>
  );
}
