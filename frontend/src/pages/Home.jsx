import React, { useEffect, useState, useRef } from "react";
import { Box, Fade } from "@chakra-ui/react";

import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import SectionNav from "../components/SectionNav";
import MobileSectionNav from "../components/MobileSectionNav";
import Form from "../components/Form";
import PreviewSection from "../components/PreviewSection";

export default function Home() {
  const { dispatch } = useProfileContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  //ref for scroll comparison
  const homeRef = useRef(null);
  //refs to forward for section navigation scrollIntoView
  const sectionsRef = {
    user: useRef(null),
    contact: useRef(null),
    user_profile: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    preview: useRef(null),
  };

  const [setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("user");
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const response = await fetch(
        `process.env.URL/api/profile/${user.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          console.log("AUTHORIZATION EXPIRED");
          logout();
        }
      }
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
      const profile = {
        ...json,
        experience,
        education,
      };
      if (response.ok) {
        setIsLoading(false);

        dispatch({ type: "SET_PROFILE", payload: profile });
      }
    };

    if (user) {
      fetchProfile();
    }
  }, []);
  const scrollToRef = (section) => {
    const ref = sectionsRef[section].current;
    if (ref) {
      ref.scrollIntoView();
      setCurrentSection(section);
    }
  };
  const getActiveSection = () => {
    const y = homeRef.current.scrollTop;
    const reverseKeys = Object.keys(sectionsRef);
    reverseKeys.forEach((key) => {
      const ref = sectionsRef[key].current;
      if (ref) {
        if (y >= ref.offsetTop - 300) {
          setCurrentSection(key);
        }
      }
    });
  };
  const setScrollValue = () => {
    const pageScroll = homeRef.current.scrollTop;
    const height =
      homeRef.current.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (pageScroll / height) * 100;
    setScrolled(scrollPercent);
  };
  const handleScroll = () => {
    getActiveSection();
    setScrollValue();
  };
  return (
    <Box
      pos="relative"
      h="100vh"
      onScroll={handleScroll}
      overflowY={"scroll"}
      overflowX="hidden"
      ref={homeRef}
      pl={{ base: "4", md: "12", lg: "32" }}
      pr={{ base: "4", md: "12", lg: "8" }}
    >
      <Fade in={user}>
        <SectionNav
          scrollToRef={scrollToRef}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          scrolled={scrolled}
        />
      </Fade>

      <MobileSectionNav
        scrollToRef={scrollToRef}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <Form
        token={user.token}
        ref={sectionsRef}
        setCurrentSection={setCurrentSection}
      />
      <PreviewSection
        token={user.token}
        ref={sectionsRef.preview}
        scrolled={scrolled}
        currentSection={currentSection}
      />
    </Box>
  );
}
