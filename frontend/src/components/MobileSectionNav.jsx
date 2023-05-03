import React, { useRef } from "react";
import { sections } from "../../utils/sections";
import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";

export default function MobileSectionNav({ scrollToRef, currentSection }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const handleClick = (section) => {
    scrollToRef(section);
    onClose();
  };
  return (
    <Flex
      pos="fixed"
      bottom="0"
      left="0"
      h="150px"
      w="100%"
      display={{ base: "flex", md: "none" }}
      bgGradient="linear(to-t, gray.100, transparent)"
      zIndex="3"
      pointerEvents="none"
    >
      <Button
        ref={btnRef}
        pos="absolute"
        bottom="4vw"
        left="4vw"
        w="auto"
        my="4"
        px="6"
        color="blue.400"
        leftIcon={<BsListNested size="24px" color="blue.400" />}
        bg="gray.50"
        border="2px solid"
        borderColor="blue.400"
        pointerEvents="auto"
        onClick={onOpen}
      >
        Sections
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="blue.500" color="white">
          <DrawerBody>
            <Flex direction="column" w="100%" pt="12" pb="16">
              {sections.map((section, i) => {
                return (
                  <Button
                    key={i}
                    pointerEvents="auto"
                    variant={
                      currentSection === section.section ? "navActive" : "nav"
                    }
                    onClick={() => handleClick(section.section)}
                    fontSize="24px"
                  >
                    {section.title}
                  </Button>
                );
              })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
