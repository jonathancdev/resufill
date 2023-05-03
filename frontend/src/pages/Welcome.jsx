import React, { useState } from "react";
import { useTempSignup } from "../hooks/useTempSignup";
import {
  Flex,
  Image,
  Link,
  Text,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import img from "../assets/home_illustration.png";
export default function Welcome() {
  const { signup, error, isLoading } = useTempSignup();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    onOpen();
    await signup();
    onClose();
  };
  return (
    <Flex
      bg="transparent"
      px={{ base: "2", md: "8" }}
      maxW="400px"
      w="100vw"
      h="100vh"
      justify="center"
      margin="0 auto"
    >
      <Flex
        mt={{ base: "50px", lg: "60px", xl: "100px" }}
        h="100%"
        direction="column"
      >
        <Heading>Welcome!</Heading>
        <Image
          src={img}
          h="20%"
          opacity=".8"
          w="auto"
          mb="8"
          objectFit="contain"
        ></Image>
        <Flex direction="column">
          <Button
            as={Link}
            href="/login"
            w="100%"
            border="2px"
            variant="photoSection"
          >
            Login
          </Button>
          <Button
            as={Link}
            href="/signup"
            w="100%"
            border="2px"
            variant="photoSection"
          >
            Sign Up
          </Button>
        </Flex>
        <Flex w="100%" justify="center">
          <Text fontWeight="600" mt="3" mb="1">
            Not ready to make an account?
          </Text>
        </Flex>
        <Text fontWeight="400" mb="2">
          Use a disposable account to try it now
        </Text>
        <Button variant="add" onClick={handleClick}>
          Let's go!
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "sm" }}>
        <ModalOverlay />
        <ModalContent pb="8" mt="32" mx="4">
          <ModalHeader pt="4">
            {isLoading
              ? "Creating disposable account..."
              : "Temporary account created."}
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
    </Flex>
  );
}
