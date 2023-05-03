import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useProfileContext } from "./useProfileContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: profileDispatch } = useProfileContext();

  const createPhoto = async (user_info) => {
    const body = {
      user_photo: "",
      user_id: user_info.user._id,
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
    const { _id, first_name, middle_name, last_name, profession, email } =
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
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.",
      contact_information: {
        telephone: 123456789,
        email: email,
        city: "Alexandria",
        state: "Alexandria",
        country: "Egypt",
        links: [
          {
            partial_url: "https://www.",
            website: "personalWebsite",
            user_input: "me.example.com",
          },
          {
            partial_url: "https://www.twitter.com/",
            website: "twitter",
            user_input: "username123",
          },
          {
            partial_url: "https://www.linkedin.com/in/",
            website: "linkedIn",
            user_input: "username456",
          },
          {
            partial_url: "https://www.instagram.com/",
            website: "instagram",
            user_input: "username789",
          },
        ],
      },
      education: [
        {
          institution: "Midlands University",
          degree: "Bachelor of Arts in Linguistics",
          description: "Studied language structure and meaning",
          end_date: "1464566400000",
        },
        {
          institution: "Central State College",
          degree: "Latin Textual Criticism and Philology",
          description: "Analyzed ancient texts and manuscripts",
          end_date: "1447545600000",
        },
      ],
      experience: [
        {
          title: "Position 1",
          company: "ABC Company",
          start_date: "2020-08-13",
          end_date: "2023-02-10",
          duties: [
            "Lorem ipsum dolor sit amet",
            "Consectetur adipiscing elit",
            "Sed do eiusmod tempor",
          ],
        },
        {
          title: "Position 2",
          company: "Agency 123",
          start_date: "2018-09-01",

          end_date: "2020-06-01",

          duties: [
            "Incididunt ut labore et dolore",
            "Magna aliqua Ut enim ad",
            "Minim veniam quis nostrud",
          ],
        },
        {
          title: "Position 3",
          company: "Company XYZ",
          start_date: "2015-07-24",

          end_date: "2018-07-24",

          duties: [
            "Exercitation ullamco laboris nisi",
            "Aliquip ex ea commodo consequat",
            "Duis aute irure dolor in",
          ],
        },
      ],
      skills: [
        "Time management",
        "Communication",
        "Organization",
        "Problem-solving",
        "Attention to detail",
        "Computer proficiency",
      ],
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
    }
    if (response.ok) {
      profileDispatch({ type: "SET_PROFILE", payload: json });
      setIsLoading(false);
    }
    console.log("PROFILE CREATED");
  };

  const signup = async (user_info) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`process.env.URL/api/user/signup`, {
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
      // save user to local storage
      localStorage.setItem("resufill_user", JSON.stringify(json));

      //create initial user profile
      await createProfile(json);
      await createPhoto(json);

      //update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
