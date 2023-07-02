import LoginForm from "@/components/LoginForm";
import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import React from "react";

const Signup = () => {
  return (
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
  );
};

export default Signup;
