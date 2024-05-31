import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useAppDispatch } from "../redux/store";
import { userActions } from "../redux/slices/userSlice";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(userActions.setUser({ email: user.email }));
      } else {
        dispatch(userActions.setUser({}));
      }
    });
  }, []);
  return;
};
