import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} align="center" color="white">
        Register
      </Text>

      <Box>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel color="white">Name</FormLabel>
            <Input type="name" name="name" borderColor="gray.700" color="white" placeholder="Enter your mame" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Email</FormLabel>
            <Input
              type="email"
              name="email"
              borderColor="gray.700" color="white" placeholder="Enter your email address"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              borderColor="gray.700" color="white" placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel color="white">Confirm Password</FormLabel>
            <Input
              type="password"
              borderColor="gray.700" color="white" placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword && (
              <Text fontSize="xs" color="red.500" class="">
                The password does not match
              </Text>
            )}
          </FormControl>

          <Button mt={6} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
