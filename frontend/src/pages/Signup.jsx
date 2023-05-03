import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import {
  Box,
  Container,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onOpen();
    const user_info = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      profession,
      email,
      password,
    };
    //send post request to server
    await signup(user_info);
    onClose();
  };
  return (
    <Container
      px="8"
      py={{ xs: "2" }}
      bgGradient="linear(to-br, gray.100, blue.50)"
      alignItems="start"
    >
      <Box
        borderRadius="7px"
        p={{ base: "0", lg: "8" }}
        pt={{ base: "12", md: "0" }}
        h="100vh"
        overflowY="scroll"
      >
        <FormControl
          as="form"
          className="signup"
          isInvalid={error}
          onSubmit={handleSubmit}
        >
          <Heading fontSize="32px" mb={{ base: "0", xl: "4" }}>
            Sign up
          </Heading>
          <FormLabel>First name: </FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
          <FormLabel>Middle name: (optional)</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
            value={middleName}
          />
          <FormLabel>Last name: </FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
          <FormLabel>Profession: (you can change this later)</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setProfession(e.target.value);
            }}
            value={profession}
          />
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
              my="3"
            >
              Sign up
            </Button>
          </Flex>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "sm" }}>
        <ModalOverlay />
        <ModalContent pb="8" mt="32" mx="4">
          <ModalHeader pt="4">
            {isLoading
              ? "Creating your account..."
              : "Your account was created!"}
          </ModalHeader>
          <ModalCloseButton disabled={isLoading} pt="2" />
          <ModalBody>
            {isLoading && (
              <Flex justify="center">
                <Spinner margin="0 auto" />
              </Flex>
            )}
            {!isLoading && <Text>Have fun!</Text>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
