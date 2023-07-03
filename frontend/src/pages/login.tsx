import LoginForm from "@/components/LoginForm";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container padding={5}>
        <Card>
          <CardBody>
            <Heading textAlign={"center"} color={"teal.600"}>
              Login
            </Heading>
            <LoginForm />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Login;
