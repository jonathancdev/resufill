import React, { useEffect, forwardRef } from "react";
import UserPhotoSection from "./UserPhotoSection";
import {
  Container,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

export default forwardRef(function UserSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors, token } = props;

  //destructure profile state and shorten formErrors for section
  const { first_name, middle_name, last_name, profession } =
    formState?.user ?? {};
  const errors = formErrors.user.fields;

  //on formState update validate required fields and set errors
  useEffect(() => {
    const validateOnChange = () => {
      const required = ["first_name", "last_name"];
      required.forEach((field) => {
        if (!errors.includes(field) && formState.user[field] === "") {
          setFormErrors({
            ...formErrors,
            user: {
              fields: [...errors, field],
            },
          });
        } else if (errors.includes(field) && formState.user[field] !== "") {
          const errorIndex = errors.indexOf(field);
          const newErrors = errors;
          newErrors.splice(errorIndex, 1);
          setFormErrors({
            ...formErrors,
            user: {
              fields: newErrors,
            },
          });
        }
      });
    };
    if (formState.user) {
      validateOnChange();
    }
  }, [formState.user]);

  //update form state on input changes
  const handleInputChange = (e, field) => {
    setFormState({
      ...formState,
      user: {
        ...formState.user,
        [field]: e.target.value,
      },
    });
  };

  return (
    <Container ref={ref}>
      <FormControl as="form" isInvalid={formErrors.user.fields.length > 0}>
        <Box py="40px">
          <Heading variant="section">My Information</Heading>
          <UserPhotoSection token={token} formState={formState} />
          <FormLabel>First name: *</FormLabel>
          <Input
            isInvalid={errors.includes("first_name")}
            type="text"
            onChange={(e) => handleInputChange(e, "first_name")}
            value={first_name || ""}
          />

          <FormLabel>Middle name: </FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange(e, "middle_name")}
            value={middle_name || ""}
            isInvalid={false}
          />

          <FormLabel>Last name: *</FormLabel>
          <Input
            isInvalid={errors.includes("last_name")}
            type="text"
            onChange={(e) => handleInputChange(e, "last_name")}
            value={last_name || ""}
          />

          <FormLabel>Profession: </FormLabel>
          <Input
            type="text"
            onChange={(e) => handleInputChange(e, "profession")}
            value={profession || ""}
            isInvalid={false}
          />

          <FormErrorMessage px="2">
            Complete all required fields!
          </FormErrorMessage>
        </Box>
      </FormControl>
    </Container>
  );
});
