import React, { useState, forwardRef, useRef, useEffect } from "react";
import {
  Container,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import { useProfileContext } from "../hooks/useProfileContext";
import { MdEditNote, MdOutlineFileDownload } from "react-icons/md";
import MasterDocument from "./MasterDocument";
export default forwardRef(function PreviewSection(props, ref) {
  const { token, scrolled } = props;

  const { profile, dispatch } = useProfileContext();

  const wrapper = useRef();
  const content = useRef();
  const euRatio = "1 / 1.414";

  const [documentSettings, setDocumentSettings] = useState({
    size: "us",
    colors: "gray",
    avatar: {
      radius: "0px",
      grayscale: false,
    },
  });

  useEffect(() => {
    applyScaling(wrapper, content);
  }, [documentSettings.size]);

  useEffect(() => {
    const scale = () => applyScaling(wrapper, content);
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  });

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

  return (
    <Container
      pos="relative"
      ref={ref}
      ml={{ base: "-16px", md: "202px", lg: "222px" }}
      w={{
        base: "100vw",
        md: "calc(100vw - 250px)",
        lg: "calc(100vw - 350px)",
      }}
      variant="preview"
      mb={{ base: "12", md: "36", lg: "36" }}
    >
      <Flex
        shadow="lg"
        sx={{ aspectRatio: euRatio }}
        w={{ base: "80vw", md: "50vw", lg: "40vw", xl: "40vw" }}
        maxW="650px"
        h="auto"
        left="0"
        right="0"
        top="8vw"
        margin="0 auto"
        pos="absolute"
        ref={wrapper}
        mt={{ base: "80px", md: "0" }}
      >
        <MasterDocument
          documentSettings={documentSettings}
          profile={profile}
          ref={content}
          token={token}
        />
      </Flex>
      {scrolled > 90 && (
        <Flex
          pos="fixed"
          bottom={{ base: "28%", xs: "25%", sm: "22%" }}
          right={{ base: "6vw", md: "4vw", xl: "10vw" }}
          direction="column"
        >
          <Menu closeOnSelect={false} placement="top-end">
            <MenuButton
              as={IconButton}
              colorScheme="blue"
              icon={<MdEditNote />}
              h={{ base: "45px", sm: "55px" }}
              w={{ base: "45px", sm: "55px" }}
              fontSize="48px"
              bg="blue.100"
              borderRadius="100%"
              p="2"
              shadow="lg"
              color="blue.800"
              _hover={{ bg: "blue.50" }}
              _active={{ bg: "blue.50" }}
            />
            <MenuList minWidth="240px" fontSize="14px">
              <MenuOptionGroup title="Colors">
                <Tabs variant="soft-rounded">
                  <TabList type="radio">
                    <TabPanels>
                      <Flex px="3" justify="space-between">
                        {" "}
                        {colorThemes.map((theme, i) => {
                          return (
                            <Tab
                              borderRadius="100%"
                              key={i}
                              h="25px"
                              w="25px"
                              p="0"
                              mx="1"
                              onClick={() => {
                                setDocumentSettings({
                                  ...documentSettings,
                                  color: theme,
                                });
                              }}
                            >
                              <ColorIcon
                                theme={theme}
                                documentSettings={documentSettings}
                              />
                            </Tab>
                          );
                        })}
                      </Flex>
                    </TabPanels>
                  </TabList>
                </Tabs>
              </MenuOptionGroup>
              <MenuDivider />

              <MenuOptionGroup
                defaultValue="0px"
                title="Photo options"
                type="radio"
                onChange={(value) => {
                  setDocumentSettings({
                    ...documentSettings,
                    avatar: { ...documentSettings.avatar, radius: value },
                  });
                }}
              >
                <MenuItemOption value="0px">Square</MenuItemOption>
                <MenuItemOption value="40px">Rounded</MenuItemOption>
                <MenuItemOption value="100%">Circle</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />

              <MenuOptionGroup
                defaultValue="false"
                type="radio"
                onChange={(value) => {
                  let bool = false;
                  if (value === "true") {
                    bool = true;
                  }
                  setDocumentSettings({
                    ...documentSettings,
                    avatar: { ...documentSettings.avatar, grayscale: bool },
                  });
                }}
              >
                <MenuItemOption value="false">Color</MenuItemOption>
                <MenuItemOption value="true">Black and white</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <IconButton
            as={ReactLink}
            to="/print"
            icon={<MdOutlineFileDownload />}
            h={{ base: "45px", sm: "55px" }}
            w={{ base: "45px", sm: "55px" }}
            fontSize="36px"
            bg="green.200"
            borderRadius="100%"
            p="2"
            shadow="lg"
            color="gray.700"
            _hover={{ bg: "green.50" }}
            _active={{ bg: "green.50" }}
            state={{ documentSettings, profile, token }}
          >
            Print
          </IconButton>
        </Flex>
      )}
    </Container>
  );
});

const colorThemes = [
  "white",
  "gray",
  "blue",
  "teal",
  "purple",
  "orange",
  "yellow",
];

const ColorIcon = ({ theme, documentSettings }) => {
  return (
    <Flex
      w="25px"
      h="25px"
      p="0"
      m="0"
      bg={theme === "white" ? "white" : theme + ".100"}
      borderRadius="100%"
      shadow="lg"
      justify="center"
      align="center"
    >
      <Text fontSize="11px" color={theme + ".800"}>
        abc
      </Text>
    </Flex>
  );
};
