import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import {
  Box,
  Flex,
  Text,
  Stack,
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

export default function Account() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const deletePhoto = async () => {
    const id = user.user._id;
    const token = user.token;

    const response = await fetch(
      `process.env.URL/api/photo/deletePhotoByUserId/${id}
    `,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      console.log("photo deleted");
      console.log(json);
    }
    return "photo deleted";
  };
  const deleteProfile = async () => {
    const id = user.user._id;
    const token = user.token;

    const response = await fetch(
      `process.env.URL/api/profile/deleteProfileByUserId/${id}
    `,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      console.log("user deleted");
      console.log(json);
    }
    return "profile deleted";
  };

  const deleteUser = async () => {
    const id = user.user._id;
    const token = user.token;
    const response = await fetch(
      `process.env.URL/api/user/${id}
    `,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      console.log("user deleted");
    }
    return "user deleted";
  };

  const handleDelete = async () => {
    setIsLoading(true);
    onOpen();
    await deletePhoto();
    await deleteProfile();
    await deleteUser();
    const showMessage = new Promise((res) =>
      setTimeout(() => {
        setIsLoading(false);
        res();
      }, 1500)
    );
    await showMessage;
    setTimeout(() => {
      logout();
    }, 2000);
  };
  return (
    <Box
      h="100vh"
      bgGradient="linear(to-tl, gray.50, blue.50)"
      px={{ base: "4", md: "12", lg: "32", xl: "60" }}
      py="32"
    >
      <Box borderRadius="7px">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "xs", sm: "sm" }}
        >
          <ModalOverlay />
          <ModalContent pb="8" mt="32" mx="4">
            <ModalHeader pt="4">
              {isLoading ? "" : "Account deleted"}
            </ModalHeader>
            <ModalCloseButton disabled={isLoading} pt="2" />
            <ModalBody>
              {isLoading && (
                <Flex justify="center">
                  <Spinner margin="0 auto" />
                </Flex>
              )}
              {!isLoading && (
                <Text>
                  Your account and information have been permanently deleted.
                </Text>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box>
          <Stack align="center">
            <Heading>My Account</Heading>
            <Text>
              {user.user.first_name} {user.user.middle_name}{" "}
              {user.user.last_name}
            </Text>
            <Text fontWeight="600">{user.user.email}</Text>
            <Flex>
              <Button
                border="1px solid"
                m="3"
                _hover={{ bg: "red.400", border: "none", color: "gray.50" }}
                onClick={() => handleDelete()}
              >
                Delete account
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
