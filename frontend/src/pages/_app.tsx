/* eslint-disable react-hooks/exhaustive-deps */
import ErrorAlert from "@/components/ErrorAlert";
import Header from "@/components/Header";
import { useGlobalStore } from "@/stores/globalStore";
import { useUserStore } from "@/stores/userStore";
import { setAuthHeader, setupClientSideAxios } from "@/utils/axios.utils";
import { decodeToken, isClient } from "@/utils/common.utils";
import { ChakraProvider } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import { useEffect } from "react";

if (isClient) {
  setupClientSideAxios();
}

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useUserStore();
  const { error } = useGlobalStore();

  const setUserFromCookies = () => {
    const user = decodeToken();
    if (user) {
      setUser(user);
      setAuthHeader(getCookie("token") as string);
    }
  };

  useEffect(() => {
    setUserFromCookies();
  }, []);

  return (
    <ChakraProvider>
      {error.show && <ErrorAlert message={error.message} />}
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
