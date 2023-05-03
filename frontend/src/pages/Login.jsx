import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
  Box,
  Container,
  Flex,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send post request to server
    await login(email, password);
  };
  return (
    <Container
      bgGradient="linear(to-br, gray.100, blue.50)"
      p="8"
      alignItems={{ base: "start", xl: "center" }}
    >
      <Box borderRadius="7px" p={{ base: "8", md: "8" }}>
        <FormControl as="form" className="login" isInvalid={error}>
          <Stack>
            <Heading>Log in:</Heading>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Flex>
              <Button
                type="submit"
                isLoading={isLoading}
                onClick={handleSubmit}
                variant="add"
              >
                Log in
              </Button>
            </Flex>
          </Stack>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
    </Container>
  );
}
