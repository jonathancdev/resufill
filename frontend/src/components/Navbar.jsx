import React, { useRef } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Link,
  Text,
  Spacer,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Collapse,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import { useOutsideClick } from "@chakra-ui/react";
import { RxCaretDown } from "react-icons/rx";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const path = location.pathname;
  const handleClick = () => {
    logout();
  };

  const { onClose } = useDisclosure();
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });
  return (
    <Box
      as="header"
      pr={{ base: "4", md: "2", lg: "12", xl: "24" }}
      pos={{ base: "sticky", md: "absolute" }}
      top="0"
      w="100vw"
      bg={{ base: "blue.400", md: "transparent" }}
      shadow={{ base: "sm", md: "none" }}
      zIndex="1"
      display={path === "/print" ? "none" : "static"}
    >
      <Flex align="center" pos="relative">
        {/* standard logo */}
        <Fade in={path === "/" ? user : true}>
          {" "}
          <Flex
            display={{ base: "none", md: "flex" }}
            h={"70px"}
            bg={path === "/" && user ? "blue.400" : "transparent"}
            py="2"
            px={{ base: "4", md: "12", lg: "24" }}
            w={{ base: "100px", md: "250px", lg: "350px" }}
            align="center"
          >
            <Link as={ReactLink} to="/">
              <Flex
                color={path !== "/" ? "blue.400" : "white"}
                textStyle="logo"
              >
                resufill
              </Flex>
            </Link>
          </Flex>
        </Fade>
        {/* mobile logo */}
        <Flex
          display={{ base: "flex", md: "none" }}
          h={{ base: "50px", xs: "80px" }}
          py="2"
          px={{ base: "4", md: "12", lg: "24" }}
          w="100%"
          justify="center"
          align="center"
        >
          <Link as={ReactLink} to="/">
            <Flex color="white" textStyle="logo">
              resufill
            </Flex>
          </Link>
        </Flex>
        <Spacer />

        <Flex as="nav">
          {/* START DESKTOP VIEW */}
          {user && (
            <Flex
              align="center"
              pos={{ base: "absolute", md: "static" }}
              top={{ base: "10px", xs: "20px" }}
              right="0"
            >
              <Flex
                pointerEvents="none"
                borderRadius="100%"
                border="2px"
                w={{ base: "30px", xs: "40px" }}
                h={{ base: "30px", xs: "40px" }}
                fontSize={{ base: "12px", xs: "16px" }}
                justify="center"
                align="center"
                fontWeight="700"
                color={{ base: "white", md: "blue.400" }}
              >
                {user.user.first_name.substring(0, 1)}
                {user.user.last_name.substring(0, 1)}
              </Flex>
              <Menu border="none">
                <MenuButton color={{ base: "white", md: "blue.400" }}>
                  <RxCaretDown size="25px" />
                </MenuButton>
                <MenuList
                  p="0"
                  shadow="md"
                  borderColor="transparent"
                  bg="white"
                  mt="2"
                >
                  <MenuItem
                    py="3"
                    borderRadius="4"
                    transition="all .1s ease-in-out"
                    cursor="default"
                    bg="white"
                    _hover={{
                      bg: "white",
                      transform: "scale(1.0)",
                      transition: "all .1s ease-in-out",
                    }}
                  >
                    {user.user.email}
                  </MenuItem>
                  <MenuDivider m="0" />
                  <MenuItem
                    py="0"
                    borderRadius="4"
                    transition="all .1s ease-in-out"
                    bg="white"
                    _hover={{
                      bg: "blue.300",
                      transform: "scale(1.05)",
                      color: "white",
                      fontWeight: "600",
                      transition: "all .1s ease-in-out",
                    }}
                  >
                    <Link
                      as={ReactLink}
                      to="/account"
                      transition="all .1s ease-in-out"
                      w="100%"
                      py="3"
                    >
                      Account
                    </Link>
                  </MenuItem>
                  <MenuDivider m="0" />
                  <MenuItem
                    py="3"
                    borderRadius="4"
                    transition="all .1s ease-in-out"
                    bg="white"
                    _hover={{
                      bg: "blue.300",
                      transform: "scale(1.05)",
                      color: "white",
                      fontWeight: "600",
                      transition: "all .1s ease-in-out",
                    }}
                    onClick={handleClick}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}

          {!user && (
            <Flex
              onClose={onClose}
              display={{ base: "none", md: "block" }}
              top="0"
              right="0"
              color="white"
              fontWeight="600"
              fontSize="18px"
            >
              <Link
                as={ReactLink}
                to="/login"
                px="3"
                color={path !== "/" && "blue.500"}
              >
                Login
              </Link>
              <Link
                as={ReactLink}
                to="/signup"
                px="3"
                color={path !== "/" && "blue.500"}
              >
                Sign Up
              </Link>
            </Flex>
          )}
        </Flex>
        {/* END DESKTOP VIEW */}
        {!user && (
          <Menu border="none">
            <MenuButton
              color={{ base: "white", md: "blue.400" }}
              position="absolute"
              right="0"
              display={{ base: "block", md: "none" }}
            >
              <BiMenu size="36px" />
            </MenuButton>
            <MenuList
              p="0"
              shadow="md"
              borderColor="transparent"
              bg="white"
              mt="0"
            >
              <MenuItem
                py="0"
                borderRadius="4"
                transition="all .1s ease-in-out"
                bg="white"
                _hover={{
                  bg: "blue.300",
                  transform: "scale(1.05)",
                  color: "white",
                  fontWeight: "600",
                  transition: "all .1s ease-in-out",
                }}
              >
                <Link
                  as={ReactLink}
                  to="/login"
                  transition="all .1s ease-in-out"
                  w="100%"
                  py="3"
                  fontWeight="600"
                >
                  Login
                </Link>
              </MenuItem>
              <MenuDivider m="0" />
              <MenuItem
                py="0"
                borderRadius="4"
                transition="all .1s ease-in-out"
                bg="white"
                _hover={{
                  bg: "blue.300",
                  transform: "scale(1.05)",
                  color: "white",
                  fontWeight: "600",
                  transition: "all .1s ease-in-out",
                }}
              >
                <Link
                  as={ReactLink}
                  to="/signup"
                  transition="all .1s ease-in-out"
                  w="100%"
                  py="3"
                  fontWeight="600"
                >
                  Sign up
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
}
