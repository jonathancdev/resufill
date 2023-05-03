import React, { useEffect, useState, forwardRef } from "react";
import {
  Container,
  Box,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";
export default forwardRef(function SkillsSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors } = props;
  const { skills } = formState;

  const [temporarySkill, setTemporarySkill] = useState("");

  const [errors, setErrors] = useState([]);

  //set error if saved skill is changed to empty string
  useEffect(() => {
    skills.forEach((skill, i) => {
      if (!formErrors.skills.fields.includes(i) && skill === "") {
        setFormErrors({
          ...formErrors,
          skills: {
            fields: [...errors, i],
          },
        });
      } else if (formErrors.skills.fields.includes(i) && !skill == "") {
        const errorIndex = errors.indexOf(i);
        const newErrors = errors;
        newErrors.splice(errorIndex, 1);
        setFormErrors({
          ...formErrors,
          skills: {
            fields: newErrors,
          },
        });
      }
    });
  }, [skills]);

  const handleNewInputChange = (e) => {
    setTemporarySkill(e.target.value);
  };

  const handleSavedInputChange = (e, i) => {
    let newSkills = [...formState.skills];
    newSkills[i] = e.target.value;
    setFormState({
      ...formState,
      skills: newSkills,
    });
  };

  const saveTemporarySkill = () => {
    setFormState({
      ...formState,
      skills: [...formState.skills, temporarySkill],
    });
    setTemporarySkill("");
  };

  const deleteSavedSkill = (i) => {
    const newSkillsArray = skills;
    newSkillsArray.splice(i, 1);
    setFormState({
      ...formState,
      skills: newSkillsArray,
    });
  };

  return (
    <Container ref={ref}>
      <FormControl as="form">
        <Box py="40px">
          <Heading variant="section">Skills</Heading>

          {formState?.skills?.map((skill, i) => {
            return (
              <InputGroup my="2" key={i}>
                <Input
                  variant="withElement"
                  isInvalid={formErrors.skills.fields.includes(i)}
                  type="text"
                  onChange={(e) => {
                    handleSavedInputChange(e, i);
                  }}
                  value={skill || ""}
                  maxLength="40"
                />

                <InputRightElement>
                  <IconButton
                    variant="inputElement"
                    icon={<TiDeleteOutline />}
                    onClick={() => {
                      deleteSavedSkill(i);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            );
          })}

          {formState?.skills?.length < 6 && (
            <>
              <FormLabel>Enter skill: </FormLabel>
              <Flex
                mt="2"
                align="center"
                maxWidth={{ base: "280px", sm: "320px", md: "400px" }}
              >
                <Input
                  flex="90%"
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e);
                  }}
                  value={temporarySkill || ""}
                  placeholder="enter a skill (optional)"
                  maxLength="40"
                />
                <IconButton
                  flex="10%"
                  fontSize="20px"
                  icon={<MdOutlineAdd />}
                  disabled={temporarySkill === ""}
                  onClick={saveTemporarySkill}
                />
              </Flex>
            </>
          )}
        </Box>
      </FormControl>
    </Container>
  );
});
