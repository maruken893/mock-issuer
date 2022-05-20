import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

// TODO: Configで設定できるようにする
// Keypair().then((key) => {
//   console.log(key);
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
