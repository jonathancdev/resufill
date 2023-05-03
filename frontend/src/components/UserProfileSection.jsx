import React, { useState, forwardRef } from "react";
import {
  Container,
  Box,
  Heading,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
export default forwardRef(function UserProfileSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors } = props;
  const { user_profile } = formState;
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length < 300) {
      setFormState({
        ...formState,
        user_profile: e.target.value,
      });
      setFormErrors({
        ...formErrors,
        profile: {
          fields: [],
        },
      });
      setError(false);
    } else {
      setFormErrors({
        ...formErrors,
        profile: {
          fields: ["profile"],
        },
      });
      setError(true);
    }
  };

  return (
    <Container ref={ref}>
      <FormControl as="form" isInvalid={formErrors.profile.fields.length > 0}>
        <Box py="40px">
          <Heading as={FormLabel} variant="section">
            About me
          </Heading>
          <Textarea
            className={error ? "error" : ""}
            type="text"
            onChange={(e) => handleChange(e)}
            value={user_profile || ""}
            minH="200px"
          />
          <FormErrorMessage px="2">Maximum length exceeded.</FormErrorMessage>
        </Box>
      </FormControl>
    </Container>
  );
});
