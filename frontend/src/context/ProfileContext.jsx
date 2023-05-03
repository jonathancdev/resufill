import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

export const profileReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        profile: action.payload,
      };
    case "UPDATE_PROFILE":
      return {
        profile: action.payload,
      };
    case "SET_PHOTO":
      return {
        profile: {
          ...state.profile,
          user_photo: action.payload,
        },
      };
    default:
      return state;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, {
    profile: null,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
