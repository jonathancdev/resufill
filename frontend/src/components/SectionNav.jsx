import React from "react";
import { sections } from "../../utils/sections";
import { Flex, Button } from "@chakra-ui/react";

export default function SectionNav({ scrollToRef, currentSection, scrolled }) {
  const handleClick = (section) => {
    scrollToRef(section);
  };
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      pos="fixed"
      left="0"
      pl={{ base: "4", md: "8", lg: "20" }}
      pointerEvents="none"
      h="100%"
      w={{ md: "250px", lg: "350px" }}
      py="100px"
      direction="column"
      bg="blue.400"
      top="70px"
    >
      <Flex direction="column" w="100%">
        {sections.map((section, i) => {
          return (
            <Button
              key={i}
              pointerEvents="auto"
              variant={currentSection === section.section ? "navActive" : "nav"}
              onClick={() => handleClick(section.section)}
            >
              {section.title}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
}
