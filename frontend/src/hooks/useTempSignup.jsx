import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useProfileContext } from "./useProfileContext";
import base64img from "../../tempPhoto";

export const useTempSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: profileDispatch } = useProfileContext();

  const createPhoto = async (user_info) => {
    const body = {
      user_photo: base64img,
      user_id: user_info.user._id,
      temporary: true,
    };
    const response = await fetch(`process.env.URL/api/photo`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      profileDispatch({ type: "SET_PHOTO", payload: json.user_photo });
    }
  };

  const createProfile = async (user_info) => {
    console.log("create profile");
    setIsLoading(true);
    const { _id, first_name, middle_name, last_name, profession } =
      user_info.user;

    const profile = {
      user_id: _id,
      user: {
        first_name,
        middle_name,
        last_name,
        profession,
      },
      photo: "",
      user_profile:
        "I am a skilled copywriter with over 5 years of experience creating compelling content for various industries. My ability to craft persuasive copy has helped my clients improve their online presence, increase sales, and establish their brand identity.",
      contact_information: {
        telephone: "5555555555",
        email: "maria@example.com",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        links: [
          {
            partial_url: "https://www.",
            website: "personalWebsite",
            user_input: "mfmcreative.xyz",
          },
          {
            partial_url: "https://www.twitter.com/",
            website: "twitter",
            user_input: "mfmcreative",
          },
          {
            partial_url: "https://www.linkedin.com/in/",
            website: "linkedIn",
            user_input: "mariafmart3412",
          },
          {
            partial_url: "https://www.instagram.com/",
            website: "instagram",
            user_input: "mariawrites_xyz",
          },
        ],
      },
      education: [
        {
          institution: "University of California, Los Angeles (UCLA) ",
          degree: "Bachelor of Arts in English",
          description: "Studied literature, language, & writing",
          end_date: "2016-05-30",
        },
        {
          institution: "American Writers & Artists Inc. (AWAI)",
          degree: "Certificate in Copywriting",
          description: "",
          end_date: "2015-11-15",
        },
      ],
      experience: [
        {
          title: "Copywriter",
          company: "Belo Marketing ",
          start_date: "2018-03-13",
          end_date: "2022-03-05",
          duties: [
            "Crafted persuasive ad, web and social copy. ",
            "Conducted research to inform messaging. ",
            "Collaborated with designers to deliver high-quality content.",
          ],
        },
        {
          title: "Freelance Copywriter",
          company: "MM Creative",
          start_date: "2017-02-15",

          end_date: "2018-03-01",

          duties: [
            "Wrote engaging blogs and articles.",
            "Optimized content for SEO to improve web visibility.",
          ],
        },
        {
          title: "Copywriting Intern",
          company: "Zell Creative",
          start_date: "2015-06-01",

          end_date: "2016-02-01",

          duties: [
            "Crafted engaging posts for multiple platforms. ",
            "Analyzed metrics to inform content strategy.",
          ],
        },
      ],
      skills: [
        "Strong writing and editing skills",
        "Research and analysis",
        "Marketing and advertising knowledge",
        "Time management",
        "Creativity",
      ],
      temporary: true,
    };
    const response = await fetch(`process.env.URL/api/profile`, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("Error creating profile");
    }
    if (response.ok) {
      profileDispatch({ type: "SET_PROFILE", payload: json });
      setIsLoading(false);
      console.log("Profile created");
    }
  };

  const signup = async (user_info) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`process.env.URL/api/user/tempaccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_info),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      console.log("user created");
      // save user to local storage

      localStorage.setItem("resufill_user", JSON.stringify(json));

      //create initial temp user profile
      await createProfile(json);
      await createPhoto(json);

      //update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
