import axios from "axios";
import { useQueryClient } from "@next-auth/react-query";

const axiosWithAuth = () => {
  const queryClient = useQueryClient();
  const session = queryClient.getQueryData("session");

  const token = session?.accessToken;
  const instance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};

export default axiosWithAuth;
