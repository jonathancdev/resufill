import React, { useEffect, useState, forwardRef } from "react";
import {
  Container,
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { RiSave2Line } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";

export default forwardRef(function EducationSection(props, ref) {
  //destructure props
  const { formState, setFormState, formErrors, setFormErrors } = props;

  //destructure profile state and shorten formErrors for section
  const { education } = formState;
  const errors = formErrors.education.fields;

  //state to hold new education item before saving to formState
  const [temporaryEducation, setTemporaryEducation] = useState({
    institution: "",
    degree: "",
    description: "",
    end_date: "",
  });

  //state to hold input errors to validate new item inputs
  const [temporaryErrors, setTemporaryErrors] = useState([]);

  //state to show/hide add new button when experience length > 0
  const [newSectionVisible, setNewSectionVisible] = useState(false);

  //required fields to use in validation
  const required = ["institution", "degree"];

  //on formState update validate required fields and set errors in saved edcuationss
  useEffect(() => {
    //for each item in education array
    if (formState?.education.length > 0) {
      education.forEach((exp, i) => {
        //check required fields
        required.forEach((field) => {
          if (
            //use find() method instead of includes() to check array for array of [field, index]
            !errors.find((el) => el[0] === field && el[1] === i) &&
            education[i][field] === ""
          ) {
            setFormErrors({
              ...formErrors,
              education: {
                //adds array with field and index to target specific input for error class
                fields: [...errors, [field, i]],
              },
            });
          } else if (
            errors.find((el) => el[0] === field && el[1] === i) &&
            education[i][field] !== ""
          ) {
            //remove field from form errors
            const errorIndex = errors.findIndex(
              (el) => el[0] === field && el[1] === i
            );
            const newErrors = errors;
            newErrors.splice(errorIndex, 1);
            setFormErrors({
              ...formErrors,
              education: {
                fields: newErrors,
              },
            });
          }
        });
      });
    }
  }, [education]);

  //on page load validate required fields in new experience form
  useEffect(() => {
    required.forEach((field) => {
      if (!temporaryEducation[field] && !temporaryErrors.includes(field)) {
        setTemporaryErrors([...temporaryErrors, field]);
      }
    });
  }, [temporaryEducation, temporaryErrors]);

  const handleNewInputChange = (e, field) => {
    setTemporaryEducation({
      ...temporaryEducation,
      [field]: e.target.value,
    });
    if (e.target.value === "" && required.includes(field)) {
      setTemporaryErrors([...temporaryErrors, field]);
    } else if (temporaryErrors.includes(field) && e.target.value !== "") {
      const errorIndex = temporaryErrors.indexOf(field);
      const newArray = temporaryErrors;
      newArray.splice(errorIndex, 1);
      setTemporaryErrors([...newArray]);
    }
  };

  const handleSavedInputChange = (e, educationIndex, field) => {
    const newArray = education.map((exp, i) => {
      if (i === educationIndex) {
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
      education: newArray,
    });
  };

  const deleteSavedEducation = (educationIndex) => {
    const newArray = education;
    newArray.splice(educationIndex, 1);
    setFormState({
      ...formState,
      education: [...newArray],
    });
  };

  const saveTemporaryEducation = () => {
    setFormState({
      ...formState,
      education: [...education, temporaryEducation],
    });
    setTemporaryEducation({
      institution: "",
      degree: "",
      description: "",
      end_date: "",
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
          formErrors.education.fields.length > 0 || temporaryErrors.length > 0
        }
      >
        <Box py="40px">
          <Heading variant="section">Education</Heading>
          {formState?.education?.map((education, educationIndex) => {
            return (
              <Box as="fieldset" mb="6" key={educationIndex}>
                <Flex
                  w="100%"
                  justify="space-between"
                  align="end"
                  px="2"
                  py="2"
                >
                  <Text fontSize="16px" fontWeight="600" color="blue.700">
                    {"Education " + (educationIndex + 1) + ":"}
                  </Text>
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="delete education"
                    onClick={() => {
                      deleteSavedEducation(educationIndex);
                    }}
                    variant="deleteSaved"
                  />
                </Flex>

                {Object.keys(education).map((key, i) => {
                  const labels = {
                    institution: "Institution",
                    degree: "Degree",
                    description: "Description",
                    end_date: "End date",
                  };

                  const types = {
                    institution: "text",
                    degree: "text",
                    description: "text",
                    end_date: "date",
                  };
                  return (
                    <Input
                      key={i}
                      my="1"
                      isInvalid={checkErrorArray(key, educationIndex)}
                      type={types[key]}
                      onChange={(e) => {
                        handleSavedInputChange(e, educationIndex, key);
                      }}
                      value={education[key] || ""}
                      placeholder={labels[key]}
                      maxLength="50"
                    />
                  );
                })}
              </Box>
            );
          })}
          {/* add new education section */}
          {/* show when saved items > 0 else hide and show add new education button */}
          {education?.length > 0 &&
          education?.length < 3 &&
          !newSectionVisible ? (
            <Button
              onClick={() => setNewSectionVisible(true)}
              leftIcon={<MdOutlineAdd fontSize="20px" />}
              my="2"
              variant="add"
            >
              Add new education
            </Button>
          ) : (
            education?.length < 3 && (
              <Box as="fieldset">
                <FormLabel>Institution: *</FormLabel>
                <Input
                  className={
                    temporaryErrors.includes("institution") ? "error" : ""
                  }
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e, "institution");
                  }}
                  value={temporaryEducation.institution || ""}
                  maxLength="50"
                />

                <FormLabel>Degree: *</FormLabel>
                <Input
                  className={temporaryErrors.includes("degree") ? "error" : ""}
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e, "degree");
                  }}
                  value={temporaryEducation.degree || ""}
                  maxLength="50"
                />

                <FormLabel>Description: </FormLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    handleNewInputChange(e, "description");
                  }}
                  value={temporaryEducation.description || ""}
                  maxLength="50"
                />

                <FormLabel>End date: </FormLabel>
                <Input
                  type="date"
                  onChange={(e) => {
                    handleNewInputChange(e, "end_date");
                  }}
                  value={temporaryEducation.end_date || ""}
                />
                <FormErrorMessage px="2">
                  Complete all required fields!
                </FormErrorMessage>
                <Button
                  id="experiencesavebutton"
                  disabled={temporaryErrors.length > 0}
                  onClick={saveTemporaryEducation}
                  leftIcon={<RiSave2Line fontSize="16px" />}
                  my="2"
                  variant="save"
                >
                  Save new education
                </Button>
              </Box>
            )
          )}
        </Box>
      </FormControl>
    </Container>
  );
});
