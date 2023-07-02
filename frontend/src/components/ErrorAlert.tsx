import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const ErrorAlert = ({ message = "Error" }: { message: string }) => {
  return (
    <Alert position={"absolute"} status="error">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorAlert;
