import React, { useEffect, useState, forwardRef } from "react";
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { TiDeleteOutline } from "react-icons/ti";
import { RiSave2Line } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";

export default forwardRef(function ExperienceSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors } = props;

  //destructure profile state and shorten formErrors for section
  const { experience } = formState;
  const errors = formErrors.experience.fields;

  //state to hold new experience item before saving to formState
  const [temporaryExperience, setTemporaryExperience] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    duties: [""],
  });

  //state to hold input errors to validate new item inputs
  const [temporaryErrors, setTemporaryErrors] = useState([]);

  //state to show/hide add new button when experience length > 0
  const [newSectionVisible, setNewSectionVisible] = useState(false);

  //required fields to use in validation
  const required = ["title", "company", "start_date", "end_date"];

  //on formState update validate required fields and set errors in saved experiences
  useEffect(() => {
    //for each item in experience array
    if (formState?.experience.length > 0) {
      experience.forEach((exp, i) => {
        //check required fields
        required.forEach((field) => {
          if (
            //use find() method instead of includes() to check array for array of [field, index]
            !errors.find((el) => el[0] === field && el[1] === i) &&
            experience[i][field] === ""
          ) {
            setFormErrors({
              ...formErrors,
              experience: {
                //adds array with field and index to target specific input for error class
                fields: [...errors, [field, i]],
              },
            });
          } else if (
            errors.find((el) => el[0] === field && el[1] === i) &&
            experience[i][field] !== ""
          ) {
            //remove field from form errors
            const errorIndex = errors.findIndex(
              (el) => el[0] === field && el[1] === i
            );
            const newErrors = errors;
            newErrors.splice(errorIndex, 1);
            setFormErrors({
              ...formErrors,
              experience: {
                fields: newErrors,
              },
            });
          }
        });
      });
    }
  }, [experience]);

  //on page load validate required fields in new experience form
  useEffect(() => {
    required.forEach((field) => {
      if (!temporaryExperience[field] && !temporaryErrors.includes(field)) {
        setTemporaryErrors([...temporaryErrors, field]);
      }
    });
  }, [temporaryExperience, temporaryErrors]);

  const handleNewInputChange = (e, field) => {
    setTemporaryExperience({
      ...temporaryExperience,
      [field]: e.target.value,
    });
    if (e.target.value === "") {
      setTemporaryErrors([...temporaryErrors, field]);
    } else if (temporaryErrors.includes(field) && e.target.value !== "") {
      const errorIndex = temporaryErrors.indexOf(field);
      const newArray = temporaryErrors;
      newArray.splice(errorIndex, 1);
      setTemporaryErrors([...newArray]);
    }
  };
  const addTemporaryDuty = () => {
    let array = [...temporaryExperience.duties];
    array.push("");
    setTemporaryExperience({
      ...temporaryExperience,
      duties: array,
    });
  };

  const handleNewDutyChange = (e, i) => {
    if (e.target.value.length < 100) {
      const tempDuties = [...temporaryExperience.duties];
      tempDuties[i] = e.target.value;
      setTemporaryExperience({
        ...temporaryExperience,
        duties: tempDuties,
      });
    }
  };

  const handleSavedInputChange = (e, expIndex, field) => {
    const newArray = experience.map((exp, i) => {
      if (i === expIndex) {
        return {
          ...exp,
          [field]: e.target.value,
        };
      } else {
        return exp;
      }
    });
    setFormState({
      ...formState,
      experience: newArray,
    });
  };

  const handleSavedDutyChange = (e, expIndex, dutyIndex) => {
    let newDuties = experience[expIndex].duties;
    newDuties[dutyIndex] = e.target.value;

    const newArray = experience.map((exp, i) => {
      if (i === expIndex) {
        return {
          ...exp,
          duties: newDuties,
        };
      } else {
        return exp;
      }
    });

    setFormState({
      ...formState,
      experience: newArray,
    });
  };

  const deleteSavedDuty = (exp, expIndex, dutyIndex) => {
    const newDutiesArray = exp.duties;
    newDutiesArray.splice(dutyIndex, 1);
    const newExpObj = {
      ...exp,
      duties: newDutiesArray,
    };
    const newExpArray = experience;
    newExpArray[expIndex] = newExpObj;
    setFormState({
      ...formState,
      experience: newExpArray,
    });
  };

  const deleteSavedExperience = (expIndex) => {
    const newArray = experience;
    newArray.splice(expIndex, 1);
    setFormState({
      ...formState,
      experience: [...newArray],
    });
  };

  const saveTemporaryExperience = () => {
    //filter to remove empty duties
    const newExp = {
      ...temporaryExperience,
      duties: temporaryExperience.duties.filter((duty) => duty !== ""),
    };
    setFormState({
      ...formState,
      experience: [...experience, newExp],
    });
    setTemporaryExperience({
      title: "",
      company: "",
      start_date: "",
      end_date: "",
      duties: [""],
    });
    setNewSectionVisible(false);
  };
  const checkErrorArray = (field, index) => {
    let bool = false;
    const compare = [field, index];
    errors.forEach((error) => {
      if (error.every((val, index) => val === compare[index])) {
        bool = true;
      }
    });
    return bool;
  };
  return (
    <Container ref={ref}>
      <FormControl
        as="form"
        isInvalid={
          formErrors.experience.fields.length > 0 || temporaryErrors.length > 0
        }
      >
        <Box py="40px">
          <Heading variant="section">Experience</Heading>

          {formState?.experience?.map((exp, expIndex) => {
            return (
              <Box as="fieldset" mb="6" key={expIndex}>
                <Flex
                  w="100%"
                  justify="space-between"
                  align="end"
                  px="2"
                  py="2"
                >
                  <Text fontSize="16px" fontWeight="600" color="blue.700">
                    {"Experience " + (expIndex + 1) + ":"}
                  </Text>
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="delete experience"
                    onClick={() => {
                      deleteSavedExperience(expIndex);
                    }}
                    variant="deleteSaved"
                  />
                </Flex>
                {Object.keys(exp)
                  .filter((key) => key !== "duties")
                  .map((key, i) => {
                    const labels = {
                      title: "Title",
                      company: "Company",
                      start_date: "Start date",
                      end_date: "End date",
                    };

                    const types = {
                      title: "text",
                      company: "text",
                      start_date: "date",
                      end_date: "date",
                    };
                    return (
                      <Input
                        key={i}
                        my="1"
                        isInvalid={checkErrorArray(key, expIndex)}
                        type={types[key]}
                        onChange={(e) => {
                          handleSavedInputChange(e, expIndex, key);
                        }}
                        value={exp[key] || ""}
                        placeholder={labels[key]}
                      />
                    );
                  })}

                {exp.duties.map((duty, dutyIndex) => {
                  return (
                    <InputGroup my="1" key={dutyIndex}>
                      <Input
                        variant="withElement"
                        type="text"
                        onChange={(e) => {
                          handleSavedDutyChange(e, expIndex, dutyIndex);
                        }}
                        isInvalid={duty === ""}
                        value={duty || ""}
                        placeholder={"Duty " + (dutyIndex + 1)}
                        maxLength="100"
                      />

                      <InputRightElement>
                        <IconButton
                          variant="inputElement"
                          icon={<TiDeleteOutline />}
                          aria-label="delete duty"
                          onClick={() => {
                            deleteSavedDuty(exp, expIndex, dutyIndex);
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  );
                })}
              </Box>
            );
          })}

          {/* add new experience section */}
          {/* show when saved items > 0 else hide and show add new experience button */}
          {experience?.length > 0 &&
          experience?.length < 3 &&
          !newSectionVisible ? (
            <Button
              onClick={() => setNewSectionVisible(true)}
              leftIcon={<MdOutlineAdd fontSize="20px" />}
              my="2"
              variant="add"
            >
              Add new experience
            </Button>
          ) : (
            experience?.length < 3 && (
              <Box as="fieldset">
                <FormLabel>Title: *</FormLabel>
                <Input
                  isInvalid={temporaryErrors.includes("title")}
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e, "title");
                  }}
                  value={temporaryExperience.title || ""}
                />

                <FormLabel>Company: *</FormLabel>
                <Input
                  isInvalid={temporaryErrors.includes("company")}
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e, "company");
                  }}
                  value={temporaryExperience.company || ""}
                />

                <FormLabel>Start date: *</FormLabel>
                <Input
                  isInvalid={temporaryErrors.includes("start_date")}
                  type="date"
                  onChange={(e) => {
                    handleNewInputChange(e, "start_date");
                  }}
                  value={temporaryExperience.start_date || ""}
                />

                <FormLabel>End date: *</FormLabel>
                <Input
                  isInvalid={temporaryErrors.includes("end_date")}
                  type="date"
                  onChange={(e) => {
                    handleNewInputChange(e, "end_date");
                  }}
                  value={temporaryExperience.end_date || ""}
                />

                {/* duties */}

                <Flex direction="column">
                  {temporaryExperience.duties.map((duty, i) => {
                    const length = temporaryExperience.duties.length;
                    return (
                      <Flex
                        mt="2"
                        align="center"
                        maxWidth={{ base: "280px", sm: "320px", md: "400px" }}
                      >
                        <Input
                          flex="90%"
                          type="text"
                          onChange={(e) => {
                            handleNewDutyChange(e, i);
                          }}
                          value={temporaryExperience.duties[i] || ""}
                          placeholder="enter a duty (optional)"
                          isInvalid={false}
                          maxLength="100"
                        />
                        {i === length - 1 && length < 3 && (
                          <IconButton
                            flex="10%"
                            fontSize="20px"
                            icon={<MdOutlineAdd />}
                            disabled={temporaryExperience.duties[i] === ""}
                            onClick={() => {
                              addTemporaryDuty();
                            }}
                          />
                        )}
                      </Flex>
                    );
                  })}

                  <FormErrorMessage px="2">
                    Complete all required fields!
                  </FormErrorMessage>
                  <Button
                    id="experiencesavebutton"
                    // className={temporaryErrors.length > 0 ? "disabled" : ""}
                    disabled={temporaryErrors.length > 0}
                    onClick={saveTemporaryExperience}
                    leftIcon={<RiSave2Line fontSize="16px" />}
                    my="2"
                    variant="save"
                  >
                    Save new experience
                  </Button>
                </Flex>
              </Box>
            )
          )}
        </Box>
      </FormControl>
    </Container>
  );
});
