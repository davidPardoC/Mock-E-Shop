import axios from "axios";

type SessionResponse = {
  token: string;
  refreshToken: string;
};

const signupUser = async (email: string, password: string) => {
  const { data } = await axios.post("/users", { email, password });
  return data;
};

const loginUser = async (
  email: string,
  password: string
): Promise<SessionResponse> => {
  const { data } = await axios.post<SessionResponse>("/users/login", {
    email,
    password,
  });
  return data;
};

export const UserSevices = { signupUser, loginUser };
