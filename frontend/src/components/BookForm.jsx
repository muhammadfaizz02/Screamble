import {
  Button,
  FormControl,
  Heading,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} alignItems="center" justifyContent="center" minH="80vh">
        <Heading as="h2" size="xl" color="white" textAlign="left" mb={8}>
          Create New Book
        </Heading>
        <FormControl>
          <FormLabel color="white">Title</FormLabel>
          <Input name="title" w="600px" required color="white" borderColor="gray.700" defaultValue={bookData?.title} />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Author</FormLabel>
          <Input name="author" required color="white" borderColor="gray.700" defaultValue={bookData?.author} />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Publisher</FormLabel>
          <Input name="publisher" required color="white" borderColor="gray.700" defaultValue={bookData?.publisher} />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Year</FormLabel>
          <Input
            name="year"
            type="number"
            required
            color="white" borderColor="gray.700"
            defaultValue={bookData?.year}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Pages</FormLabel>
          <Input
            name="pages"
            type="number"
            required
            color="white" borderColor="gray.700"
            defaultValue={bookData?.pages}
          />
        </FormControl>
        {selectedImage && (
          <Image w={64} src={selectedImage} alt="Selected Image" />
        )}
        {!bookData?.image && (
          <FormControl>
            <FormLabel color="white">Image</FormLabel>
            <Input
              name="image"
              type="file"
              color="white" borderColor="gray.700"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </FormControl>
        )}

        <Button colorScheme="green" type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
      </VStack>
    </form>
  );
}
