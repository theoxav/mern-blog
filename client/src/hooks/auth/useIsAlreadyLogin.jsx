import { useSelector } from "react-redux";

export const useIsAlreadyLogin = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return Boolean(currentUser);
};
