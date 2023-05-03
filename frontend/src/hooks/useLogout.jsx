import { useAuthContext } from "./useAuthContext";
import { useProfileContext } from "./useProfileContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: profileDispatch } = useProfileContext();
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("resufill_user");
    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    profileDispatch({ type: "SET_PROFILE", payload: null });
  };
  return { logout };
};
