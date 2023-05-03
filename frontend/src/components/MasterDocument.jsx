import React, { useEffect, useState, forwardRef } from "react";
import { AspectRatio, Box, Flex, Image, Icon, Text } from "@chakra-ui/react";
import { Textfit } from "react-textfit";
import { MdOutlineEmail, MdPhoneInTalk, MdLocationPin } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";

export default forwardRef(function MasterDocument(props, ref) {
  const { token, documentSettings, profile } = props;
  let { color, avatar } = documentSettings;
  const docH = 842;
  const docW = 595;

  const [photo, setPhoto] = useState("");

  //get photo
  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await fetch(
        `process.env.URL/api/photo/${profile.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setPhoto("");
        console.log("error in photo fetch");
      }

      if (response.ok) {
        setPhoto(json.user_photo);
      }
    };

    // confirm formState loaded before fetching photo
    if (profile && token) {
      fetchPhoto();
    }
  }, [profile, token]);

  const defineColor = (color, value) => {
    let c = "white";
    if (color === "white") {
      return c;
    } else {
      c = color + "." + value;
      return c;
    }
  };

  const socialIcons = {
    personalWebsite: FaHouseUser,
    twitter: AiFillTwitterCircle,
    linkedIn: AiFillLinkedin,
    instagram: FiInstagram,
  };

  return (
    <Box
      h={docH}
      w={docW}
      position="absolute"
      top="0"
      left="0"
      ref={ref}
      transformOrigin="0 0"
      sx={{ WebkitTransformOrigin: "0 0" }}
    >
      {profile && (
        <Flex
          bg={color ? defineColor(color, "200") : "gray.200"}
          h="100%"
          w="100%"
        >
          <Flex w="32%" bg={color + ".50"} direction="column">
            <AspectRatio alignSelf="start" ratio={1 / 1} width="100%">
              {photo !== "" ? (
                <Flex
                  h="100%"
                  w="100%"
                  p={avatar.radius !== "0px" ? "4" : "0"}
                  transition="all .3s ease-in-out"
                >
                  <Image
                    h="100%"
                    w="100%"
                    objectFit="cover"
                    src={photo}
                    borderRadius={avatar.radius}
                    transition="all .3s ease-in-out"
                    filter={avatar.grayscale && "grayscale()"}
                  />
                </Flex>
              ) : (
                <Flex
                  h="100%"
                  w="100%"
                  p={avatar.radius !== "0px" ? "4" : "0"}
                  transition="all .3s ease-in-out"
                >
                  <Flex
                    h="100%"
                    w="100%"
                    justify="center"
                    align="center"
                    bg={
                      color
                        ? color === "white"
                          ? "gray.600"
                          : color + ".300"
                        : "gray.300"
                    }
                    borderRadius={avatar.radius}
                    transition="all .3s ease-in-out"
                  >
                    <Text fontWeight="800" fontSize="32px" color={"white"}>
                      {profile.user.first_name.substring(0, 1).toUpperCase()}
                      {profile.user.last_name.substring(0, 1).toUpperCase()}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </AspectRatio>
            <Flex direction="column" mt="4" px="4" lineHeight="1.3">
              <Flex direction="column">
                {/* start education section */}
                <Text
                  fontSize="18px"
                  fontWeight="800"
                  color={color + ".700"}
                  mb="2"
                >
                  EDUCATION
                </Text>

                <Flex direction="column" mb="2">
                  {profile.education.map((ed, i) => {
                    return (
                      <Education key={i} ed={ed} color={color}></Education>
                    );
                  })}
                </Flex>
              </Flex>
              {/* end education section */}

              {/* START CONTACT SECTION */}
              <Text
                fontSize="18px"
                fontWeight="800"
                color={color + ".700"}
                mb="2"
              >
                CONTACT
              </Text>
              {/* contact/icons start */}
              <Flex align="center" mb="1">
                <Icon
                  as={MdOutlineEmail}
                  pr="3px"
                  mt="2px"
                  color={color + ".800"}
                />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color={color + ".600"}
                  ml="1"
                >
                  {profile.contact_information.email}{" "}
                </Text>
              </Flex>
              <Flex align="center" mb="1">
                <Icon
                  as={MdPhoneInTalk}
                  pr="3px"
                  mt="2px"
                  color={color + ".800"}
                />
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  ml="1"
                  letterSpacing="1px"
                  color={color + ".600"}
                >
                  {profile.contact_information.telephone}{" "}
                </Text>
              </Flex>
              <Flex align="center">
                {profile.contact_information.city && (
                  <Icon
                    as={MdLocationPin}
                    pr="3px"
                    mt="2px"
                    color={color + ".800"}
                  />
                )}
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color={color + ".600"}
                  ml="1"
                >
                  {profile.contact_information.city}
                </Text>
              </Flex>
              <Flex align="center">
                <Text
                  ml="5"
                  fontSize="14px"
                  fontWeight="600"
                  color={color + ".600"}
                >
                  {profile.contact_information.state}
                </Text>
              </Flex>
              <Flex align="center" mt="1px">
                <Text
                  ml="5"
                  fontSize="14px"
                  fontWeight="600"
                  color={color + ".600"}
                >
                  {profile.contact_information.country}
                </Text>
              </Flex>
              {/* contact/icons end */}

              {/* contact links Start */}
              <Flex direction="column" mt="4">
                {profile.contact_information.links.map((link, i) => {
                  if (link.user_input) {
                    return (
                      <Flex align="center" mb="2">
                        <Icon
                          as={socialIcons[link.website]}
                          pr="3px"
                          mt="2px"
                          color={color + ".800"}
                        />
                        <Textfit
                          style={{ width: "100%" }}
                          mode="single"
                          min={10}
                          max={14}
                          key={i}
                        >
                          <Text fontWeight="600" pl="1" color={color + ".600"}>
                            {link.user_input}
                          </Text>
                        </Textfit>
                      </Flex>
                    );
                  }
                })}
              </Flex>
              {/* contact links end */}
              {/* END CONTACT SECTION */}
            </Flex>
          </Flex>
          <Flex w="66%" bg={"white"} direction="column">
            {/* START NAME AND  PROFESSION */}
            <Flex
              h={docW * 0.32 + "px"}
              maxH={docW * 0.32 + "px"}
              w="100%"
              direction="column"
              px="4"
              pt="6"
              lineHeight="1.2"
            >
              <Box>
                <Flex mb="-3">
                  <Textfit style={{ width: "100%" }} mode="single" max={52}>
                    <Text fontWeight="800" color={color + ".800"}>
                      {profile.user.first_name.toUpperCase()}{" "}
                      {profile.user.middle_name.substring(0, 1).toUpperCase()}.
                    </Text>
                  </Textfit>
                </Flex>
                <Flex mb="-2">
                  <Textfit style={{ width: "100%" }} mode="single" max={52}>
                    <Text fontWeight="800" color={color + ".800"}>
                      {profile.user.last_name.toUpperCase()}
                    </Text>
                  </Textfit>
                </Flex>
              </Box>
              <Flex>
                <Textfit style={{ width: "100%" }} mode="single" max={32}>
                  <Text px="2px" py="1" color={color + ".700"}>
                    {profile.user.profession.toUpperCase()}
                  </Text>
                </Textfit>
              </Flex>
            </Flex>
            {/* END NAME AND PROFESSION */}
            <Flex px="5" direction="column" lineHeight="1.3" mt="4" mb="2">
              <Text
                fontSize="18px"
                fontWeight="800"
                color={color + ".700"}
                mb="2"
              >
                ABOUT
              </Text>
              <Flex>
                <Text color={color + ".800"} fontSize="14px">
                  {profile.user_profile}
                </Text>
              </Flex>
            </Flex>
            <Flex px="5" direction="column" lineHeight="1.3" mb="2">
              <Text
                fontSize="18px"
                fontWeight="800"
                color={color + ".700"}
                mb="2"
              >
                EXPERIENCE
              </Text>
              <Flex direction="column">
                {profile.experience.map((exp, i) => {
                  return <Work key={i} exp={exp} color={color}></Work>;
                })}
              </Flex>
              {/* start skills section */}
              <Text
                fontSize="18px"
                fontWeight="800"
                color={color + ".700"}
                mb="2"
              >
                SKILLS
              </Text>

              <Flex mb="2" flexWrap="wrap">
                {profile.skills.map((skill, i) => (
                  <Flex key={i}>
                    <Text
                      fontSize="13px"
                      fontWeight="400"
                      color={color + ".700"}
                      lineHeight="1.5"
                    >
                      {skill}
                    </Text>
                    {i < profile.skills.length - 1 && (
                      <Flex
                        ml="1"
                        mt="2"
                        mx="2"
                        height="4px"
                        w="4px"
                        bg={
                          color && color !== "white"
                            ? color + ".500"
                            : "gray.500"
                        }
                        borderRadius="100%"
                      ></Flex>
                    )}
                  </Flex>
                ))}
              </Flex>
              {/* end skills section */}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
});

const Work = ({ exp, color }) => {
  const startDate = new Date(exp.start_date);
  const endDate = new Date(exp.end_date);

  return (
    <Flex direction="column" mb="2">
      <Flex>
        <Text fontSize="14px" fontWeight="800" color={color + ".700"}>
          {exp.title.toUpperCase()}
        </Text>
      </Flex>
      <Flex align="center">
        <Text fontSize="14px" fontWeight="600" color={color + ".700"}>
          {exp.company}
        </Text>
        <Text px="1">|</Text>
        <Flex>
          <Text fontSize="14px" color={color + ".700"}>
            {startDate.toLocaleString("default", { month: "short" })}{" "}
            {startDate.getFullYear()}
          </Text>
          <Text fontSize="14px" color={color + ".700"} pl="3px">
            {"- " + endDate.toLocaleString("default", { month: "short" })}{" "}
            {endDate.getFullYear()}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" mt="1">
        {exp.duties.map((duty, i) => {
          return (
            <Flex pb="2px" key={i}>
              <Flex
                display="inline"
                ml="1"
                mt="2"
                mr="2"
                height="4px"
                w="4px"
                bg={color && color !== "white" ? color + ".500" : "gray.500"}
                borderRadius="100%"
              ></Flex>
              <Text fontSize="14px" fontWeight="500" color={color + ".800"}>
                {duty}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

const Education = ({ ed, color }) => {
  let endDate = null;
  if (ed.end_date != undefined) {
    endDate = new Date(ed.end_date);
  }

  return (
    <Flex direction="column" mb="2" lineHeight="1.3">
      <Flex>
        <Text fontSize="14px" fontWeight="800" color={color + ".700"}>
          {ed.degree.toUpperCase()}
        </Text>
      </Flex>

      <Text fontSize="14px" fontWeight="600" color={color + ".700"}>
        {ed.institution}
      </Text>
      {ed.description && (
        <Flex>
          <Text
            fontSize="14px"
            color={color + ".600"}
            mt="3px"
            fontWeight="600"
          >
            {ed.description}
          </Text>
        </Flex>
      )}
      {endDate && (
        <Flex>
          <Text
            fontSize="14px"
            color={color + ".600"}
            mt="3px"
            fontWeight="800"
          >
            {endDate.toLocaleString("default", { month: "short" })}{" "}
            {endDate.getFullYear()}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
