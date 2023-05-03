import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import MasterDocument from "../components/MasterDocument";
import "../printStyles.css";
export default function Print() {
  const location = useLocation();
  const { documentSettings, profile, token } = location.state;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const wrapper = useRef();
  const content = useRef();

  const applyScaling = (wrapper, content) => {
    if (wrapper && content) {
      content.current.style.transform = "scale(1, 1)";

      const { width: ww, height: wh } = wrapper.current.getBoundingClientRect();
      const { width: cw, height: ch } = content.current.getBoundingClientRect();

      const x = ww / cw;
      const y = wh / ch;

      content.current.style.transform = `scale(${x}, ${y})`;
    }
  };

  useEffect(() => {
    applyScaling(wrapper, content);
  }, []);
  useEffect(() => {
    onOpen();
  }, []);

  const handleClick = () => {
    onClose();
    setTimeout(() => print(), 300);
  };

  return (
    <Box h="1130px" w="801px" pos="absolute" ref={wrapper} className="print">
      <MasterDocument
        documentSettings={documentSettings}
        profile={profile}
        token={token}
        ref={content}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", sm: "xs" }}>
        <ModalOverlay />
        <ModalContent pb="2" mt="18" mx="4">
          <ModalHeader pt="6" pb="0" fontWeight="400">
            <Text fontSize="12px" pb="2" fontStyle="italic">
              <Text display="inline" pr="1" fontWeight="800">
                *
              </Text>
              If you experience border/margin spacing issues try printing in
              Chrome or Firefox. Alternatively, choose the white background
              theme.
            </Text>
            {isLoading ? (
              ""
            ) : (
              <Text fontWeight="600">Recommended settings:</Text>
            )}
          </ModalHeader>
          <ModalBody>
            {isLoading && (
              <Flex justify="center">
                <Spinner margin="0 auto" />
              </Flex>
            )}
            {!isLoading && (
              <>
                <Text fontSize="12px">
                  Adjust your printer settings to properly save this document as
                  a PDF file.
                </Text>
                <Flex
                  direction="column"
                  bg="gray.50"
                  borderRadius="8"
                  px="4"
                  py="1"
                  mt="4"
                >
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Destination:
                    </Text>

                    <Text fontSize="14px" color="gray.600">
                      Save to PDF
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Orientation:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      Profile
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Paper size:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      A4
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Scale:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      Default / Fit to page
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Pages per sheet:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      1
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Print headers and footers:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      NO
                    </Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between" my="1">
                    <Text fontWeight="600" color="gray.700">
                      Print backgrounds:
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      YES
                    </Text>
                  </Flex>
                </Flex>
              </>
            )}
            <Flex w="100%" justify="center" py="3">
              <Button variant="add" onClick={handleClick}>
                Print
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
