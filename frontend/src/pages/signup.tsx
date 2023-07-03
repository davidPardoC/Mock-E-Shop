import LoginForm from "@/components/LoginForm";
import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const Signup = () => {
  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <Container padding={5}>
        <Card>
          <CardBody>
            <Heading textAlign={"center"} color={"teal.600"}>
              SignUp
            </Heading>
            <LoginForm isSignup />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Signup;
