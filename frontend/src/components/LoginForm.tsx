import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSevices } from "@/services/user.services";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/userStore";
import jwtDecode from "jwt-decode";
import { setAuthHeader } from "@/utils/axios.utils";
import { useGlobalStore } from "@/stores/globalStore";

type LoginFormProps = {
  isSignup?: boolean;
};

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const LoginForm = ({ isSignup = false }: LoginFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const { setUser } = useUserStore();
  const { showError } = useGlobalStore();


  const onSubmit = async (data: { [key: string]: string }) => {
    const { email, password } = data;
    if (isSignup) {
      await onSignup(email, password);
    } else {
      await onLogin(email, password);
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const session = await UserSevices.loginUser(email, password);
      setCookie("token", session.token, { maxAge: 60 * 60 * 24 * 7 });
      setCookie("refreshToken", session.refreshToken, {
        maxAge: 60 * 60 * 24 * 14,
      });
      setUser(jwtDecode(session.token));
      setAuthHeader(session.token);
      router.push("/");
    } catch (error) {
      showError((error as any).response.data.message);
    }
  };

  const onSignup = async (email: string, password: string) => {
    try {
      await UserSevices.signupUser(email, password);
      router.push("/login");
    } catch (error) {
      showError((error as any).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email:</FormLabel>
        <Input type="email" {...register("email")} />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={5} isInvalid={!!errors.password}>
        <FormLabel>Password:</FormLabel>
        <Input type="password" {...register("password")} />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Flex mt={5} flexDirection={"row"} alignItems={"center"}>
        <Button mr={4} colorScheme={"teal"} type="submit">
          {isSignup ? "Signup" : "Login"}
        </Button>
        <Box textDecor={"underline"}>
          <Link href={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Login" : "Signup"}
          </Link>
        </Box>
      </Flex>
    </form>
  );
};

export default LoginForm;
