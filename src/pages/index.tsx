import type { NextPage } from "next";
import { Link, Center, Text, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  console.log(process.env.VC_REQUEST_QRCODE);
  return (
    <div>
      <Center>
        <Text fontSize="4xl">
          - Verifiable Credential Expert Issuance and Verifier Sample. -
        </Text>
      </Center>
      <br />
      <Center>
        <Button
          as="a"
          colorScheme="teal"
          href={
            process.env.VC_REQUEST_QRCODE ? process.env.VC_REQUEST_QRCODE : ""
          }
        >
          Issuer page
        </Button>
      </Center>
      <br />
      <Center>
        <Button
          as="a"
          colorScheme="teal"
          href={
            process.env.VC_VERIFIER_QRCODE ? process.env.VC_VERIFIER_QRCODE : ""
          }
        >
          Verifier page
        </Button>
      </Center>
    </div>
  );
};

export default Home;
