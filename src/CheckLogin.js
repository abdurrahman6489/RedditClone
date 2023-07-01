import { useSelector } from "react-redux";
export const useGetAuth = ({ username, password }) => {
  const users = useSelector((state) => state.users);
  const userIndex = users.findIndex(
    (currentUser) =>
      currentUser.username == username && currentUser.password == password
  );
  return userIndex;
};
