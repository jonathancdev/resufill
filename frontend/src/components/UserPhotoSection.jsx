import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, Button, Text, Image, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { GrDocumentMissing } from "react-icons/gr";
import { RiImageEditLine, RiImageAddLine, RiSave2Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";

export default function UserPhotoSection({ token, formState }) {
  const hiddenInput = useRef();

  const [previewImage, setPreviewImage] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await fetch(
        `process.env.URL/api/photo/${formState.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        // set display photo to blank to show initials in case photo doesn't load
        setDisplayPhoto("");
        setIsLoading(false);
      }

      if (response.ok) {
        setUserPhoto(json.user_photo);
        setDisplayPhoto(json.user_photo);
        setError("");
        setIsLoading(false);
      }
    };

    // confirm formState loaded before fetching photo
    if (formState && token) {
      fetchPhoto();
    }
  }, [formState]);

  const handleChange = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    // don't allow files above 5mb
    if (file.size > 5000000) {
      setError("Maximum image size 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setDisplayPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearPreview = () => {
    setIsLoading(true);
    setPreviewImage("");
    setDisplayPhoto(userPhoto);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleClick = () => {
    hiddenInput.current.click();
  };

  const handleUpload = async () => {
    setIsLoading(true);

    const body = {
      user_photo: previewImage,
    };

    const response = await fetch(
      `process.env.URL/api/photo/${formState.user_id}
    `,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("");
      setMessage("Photo updated successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setUserPhoto(json.user_photo);
      setDisplayPhoto(json.user_photo);
      setPreviewImage("");
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const body = {
      user_photo: "",
      remove: true,
    };
    const response = await fetch(
      `process.env.URL/api/photo/remove/${formState.user_id}
    `,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("");
      setMessage("Photo removed successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setUserPhoto("");
      setDisplayPhoto("");
      setPreviewImage("");
      setIsLoading(false);
    }
  };
  return (
    <Box m="0" h={{ base: "240px", md: "280px" }} maxW="280px" margin="0 auto">
      <Box>
        <Input
          type="file"
          id="fileElem"
          accept="image/*"
          className="visually-hidden"
          ref={hiddenInput}
          onChange={handleChange}
        />

        <Box>
          <Box w="300px" m={"0 auto"}>
            <>
              <Flex justify="center" mb="4">
                {displayPhoto && (
                  <Box
                    w={{ base: "100px", md: "120px", lg: "150px" }}
                    h={{ base: "100px", md: "120px", lg: "150px" }}
                  >
                    <Image
                      src={displayPhoto}
                      borderRadius="100%"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                )}
                {!displayPhoto && (
                  <Flex
                    borderRadius="100%"
                    bg="gray.200"
                    w={{ base: "100px", md: "120px", lg: "150px" }}
                    h={{ base: "100px", md: "120px", lg: "150px" }}
                    justify="center"
                    align="center"
                  >
                    <GrDocumentMissing size="60" opacity=".5" />
                  </Flex>
                )}
              </Flex>
              <Flex justify="center">
                {!previewImage && (
                  <Button
                    leftIcon={
                      displayPhoto ? (
                        <RiImageEditLine fontSize="16px" />
                      ) : (
                        <RiImageAddLine fontSize="16px" />
                      )
                    }
                    isLoading={isLoading}
                    id="fileSelect"
                    onClick={handleClick}
                    variant="photoSection"
                    mr="2"
                  >
                    {displayPhoto ? "Change" : "Upload photo"}
                  </Button>
                )}
                {previewImage && (
                  <Button
                    isLoading={isLoading}
                    onClick={handleUpload}
                    leftIcon={<RiSave2Line fontSize="16px" />}
                    variant="photoSection"
                    borderColor="green.400"
                    color="green.400"
                    _hover={{ bg: "green.50" }}
                    mr="2"
                  >
                    Save
                  </Button>
                )}
                {previewImage && !isLoading && (
                  <Button
                    onClick={clearPreview}
                    leftIcon={<MdOutlineCancel fontSize="16px" />}
                    variant="photoSection"
                    borderColor="red.400"
                    color="red.400"
                    _hover={{ bg: "red.50" }}
                  >
                    Cancel
                  </Button>
                )}
                {userPhoto && !previewImage && (
                  <Button
                    isLoading={isLoading}
                    onClick={handleDelete}
                    leftIcon={<DeleteIcon fontSize="14px" />}
                    variant="photoSection"
                    borderColor="red.400"
                    color="red.400"
                    _hover={{ bg: "red.50" }}
                  >
                    Delete
                  </Button>
                )}
              </Flex>
            </>
          </Box>
          {error && (
            <Text color="red.400" align="center">
              {error}
            </Text>
          )}
          {message && (
            <Text color="green.400" align="center">
              {message}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}
