import { getUser } from "../../helper/axios";

export const autoLoggedIn = async () => {
  const accessJWT = localStorage.getItem("accessJWT");
  if (accessJWT) {
    const { status, user } = await getUser();

    return status == "success" ? user : {};
  }
};
