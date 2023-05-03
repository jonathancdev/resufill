import React, { useState, useEffect, forwardRef } from "react";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { useProfileContext } from "../hooks/useProfileContext";
import { RiSave2Line } from "react-icons/ri";
import { WarningIcon } from "@chakra-ui/icons";

import UserSection from "./UserSection";
import ContactInformationSection from "./ContactInformationSection";
import UserProfileSection from "./UserProfileSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillSection";

export default forwardRef(function Form(props, ref) {
  //destructure props
  const { token, setCurrentSection } = props;

  const { profile, dispatch } = useProfileContext();

  const [formState, setFormState] = useState(null);

  const [formErrors, setFormErrors] = useState({
    user: {
      fields: [],
    },
    contact_information: {
      fields: [],
    },
    profile: {
      fields: [],
    },
    experience: {
      fields: [],
    },
    education: {
      fields: [],
    },
    skills: {
      fields: [],
    },
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const checkErrors = () => {
    const keys = Object.keys(formErrors);
    //if any field has item, set true
    const errors = keys.filter((key) => formErrors[key].fields.length > 0);
    if (errors.length > 0) {
      setButtonDisabled(true);
    }
    //if all fields empty, set false
    let err = true;
    for (const key in formErrors) {
      if (formErrors[key].fields.length > 0) {
        return;
      } else {
        err = false;
      }
    }
    if (!err) {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setFormState(profile);
    }
  }, [profile]);

  useEffect(() => {
    checkErrors();
  }, [formErrors]);

  //animate loading button to show user that a change has been made
  useEffect(() => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 800);
  }, [formState]);

  const updateProfile = async () => {
    const {
      _id,
      user_id,
      user,
      user_profile,
      contact_information,
      education,
      experience,
      skills,
    } = formState;

    const response = await fetch(`process.env.URL/api/profile/${_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        user_id,
        user,
        user_profile,
        contact_information,
        education,
        experience,
        skills,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      //convert date objects to strings to display in form date inputs
      const experience = json.experience.map((ex, i) => {
        return {
          ...ex,
          start_date: ex.start_date.toString().substring(0, 10),
          end_date: ex.end_date.toString().substring(0, 10),
        };
      });
      const education = json.education.map((ed, i) => {
        return {
          ...ed,
          end_date: ed.end_date?.toString().substring(0, 10),
        };
      });
      const updatedProfile = {
        ...json,
        experience,
        education,
      };
      dispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });

      setFormState(profile);
    }
  };
  return (
    <Box overflowY={"scroll"} ml={{ md: "250px" }} overflow="hidden">
      {formState ? (
        <Box>
          <Flex
            w={{ md: "250px", lg: "350px" }}
            pos="fixed"
            top={{ base: null, md: "460px" }}
            bottom={{ base: "4vw", md: null }}
            left={{ base: null, md: "0px" }}
            right={{ base: "4vw", md: null }}
            pl={{ base: "4", md: "8", lg: "20" }}
            zIndex="4"
          >
            <Button
              onClick={updateProfile}
              bg={buttonDisabled || buttonLoading ? "red.600" : "green.400"}
              isLoading={buttonLoading}
              isDisabled={buttonDisabled}
              _loading={{
                bg: "red.300",
                color: "blue.50",
                shadow: "none",
              }}
              _hover={{
                color: "gray.100",
              }}
              _disabled={{
                bg: "red.600",
              }}
              pointerEvents={buttonDisabled || buttonLoading ? "none" : "auto"}
              leftIcon={
                buttonDisabled ? (
                  <WarningIcon size="md" color="white" />
                ) : (
                  <RiSave2Line fontSize="16px" />
                )
              }
              variant="save"
              w="auto"
              my="4"
            >
              {buttonDisabled ? "Errors found" : "Save changes"}
            </Button>
          </Flex>

          <UserSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            token={token}
            ref={ref.user}
            setCurrentSection={setCurrentSection}
          />
          <ContactInformationSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            ref={ref.contact}
            setCurrentSection={setCurrentSection}
          />
          <UserProfileSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            ref={ref.user_profile}
            setCurrentSection={setCurrentSection}
          />
          <ExperienceSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            ref={ref.experience}
            setCurrentSection={setCurrentSection}
          />
          <EducationSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            ref={ref.education}
            setCurrentSection={setCurrentSection}
          />
          <SkillsSection
            formState={formState}
            setFormState={setFormState}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            ref={ref.skills}
            setCurrentSection={setCurrentSection}
          />
        </Box>
      ) : (
        <Flex h="100vh" justify="center" align="center">
          <Spinner></Spinner>
        </Flex>
      )}
    </Box>
  );
});
