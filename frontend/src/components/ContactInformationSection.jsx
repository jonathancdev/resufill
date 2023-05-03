import React, { useEffect, useState, forwardRef } from "react";
import {
  Container,
  Box,
  Flex,
  Stack,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { FaHouseUser } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";

export default forwardRef(function ContactInformationSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors } = props;

  //destructure profile state and shorten formErrors for section
  const { email, telephone, city, state, country, links } =
    formState?.contact_information ?? {};
  const errors = formErrors.contact_information.fields;

  //state to hold social link before saving to formState
  const [temporaryLink, setTemporaryLink] = useState("");

  //required fields to use in validation
  const required = ["email", "telephone"];

  //on formState update validate required fields and set errors
  useEffect(() => {
    const validateOnChange = () => {
      required.forEach((field) => {
        if (
          !errors.includes(field) &&
          formState.contact_information[field] === ""
        ) {
          setFormErrors({
            ...formErrors,
            contact_information: {
              fields: [...errors, field],
            },
          });
        } else if (
          errors.includes(field) &&
          formState.contact_information[field] !== ""
        ) {
          const errorIndex = errors.indexOf(field);
          const newErrors = errors;
          newErrors.splice(errorIndex, 1);
          setFormErrors({
            ...formErrors,
            contact_information: {
              fields: newErrors,
            },
          });
        }
      });
    };
    if (formState.contact_information) {
      validateOnChange();
    }
  }, [formState.contact_information]);

  //on page load validate required fields
  //will show error on telephone field by default
  useEffect(() => {
    required.forEach((field) => {
      if (!formState.contact_information[field]) {
        setFormErrors({
          ...formErrors,
          contact_information: {
            fields: [...errors, field],
          },
        });
      }
    });
  }, [formState.contact_information]);

  //update form state on input changes
  const handleInputChange = (e, field) => {
    setFormState({
      ...formState,
      contact_information: {
        ...formState.contact_information,
        [field]: e.target.value,
      },
    });
  };

  //update and validate changes on saved links fields
  const handleSavedLinkChange = (e, linkIndex) => {
    const newArray = links.map((l, i) => {
      if (i === linkIndex) {
        const newObject = {
          ...l,
          user_input:
            e.target.value === l.partial_url
              ? ""
              : e.target.value.split(l.partial_url)[1],
        };

        return newObject;
      } else {
        return l;
      }
    });
    setFormState({
      ...formState,
      contact_information: {
        ...formState.contact_information,
        links: newArray,
      },
    });
  };

  const socialIcons = {
    personalWebsite: <FaHouseUser fontSize="20px" />,
    twitter: <AiFillTwitterCircle fontSize="20px" />,
    linkedIn: <AiFillLinkedin fontSize="20px" />,
    instagram: <FiInstagram fontSize="20px" />,
  };

  return (
    <Container ref={ref}>
      <FormControl
        as="form"
        isInvalid={formErrors.contact_information.fields.length > 0}
      >
        <Box py="40px">
          <Heading variant="section">Contact Details</Heading>

          <FormLabel>Email: *</FormLabel>
          <Input
            isInvalid={errors.includes("email")}
            type="text"
            onChange={(e) => handleInputChange(e, "email")}
            value={email || ""}
          />

          <FormLabel>Telephone: *</FormLabel>
          <Input
            isInvalid={errors.includes("telephone")}
            type="number"
            pattern="[0-9]+"
            onChange={(e) => handleInputChange(e, "telephone")}
            value={telephone || ""}
          />

          <FormLabel>City: </FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange(e, "city")}
            value={city || ""}
            isInvalid={false}
          />

          <FormLabel>State: </FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange(e, "state")}
            value={state || ""}
            isInvalid={false}
          />

          <FormLabel>Country: </FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange(e, "country")}
            value={country || ""}
            isInvalid={false}
          />

          <Flex
            as="div"
            isInvalid={formErrors.contact_information.fields.includes("links")}
            justify="start"
          >
            <Stack>
              <FormLabel my="2" mx="0">
                Social links: (optional)
              </FormLabel>

              {formState?.contact_information?.links.map((link, linkIndex) => {
                return (
                  <InputGroup key={linkIndex}>
                    <InputLeftElement>
                      <IconButton
                        variant="inputElement"
                        icon={socialIcons[link.website]}
                        pl="2"
                        color="blue.500"
                        _hover={{ color: "blue.500" }}
                      />
                    </InputLeftElement>
                    <Input
                      variant="withElement"
                      type="text"
                      onChange={(e) => handleSavedLinkChange(e, linkIndex)}
                      value={
                        link.user_input
                          ? link.partial_url + link.user_input
                          : link.partial_url
                      }
                      color={link.user_input ? "gray.800" : "gray.400"}
                      maxLength="60"
                    />
                  </InputGroup>
                );
              })}
            </Stack>
          </Flex>
          <FormErrorMessage px="2">
            Complete all required fields.
          </FormErrorMessage>
        </Box>
      </FormControl>
    </Container>
  );
});
