import type { NextPage } from "next";
import { Button, Center, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";

const Verifier: NextPage = () => {
  return (
    <>
      <Center>
        <Text fontSize="5xl">verifier</Text>
      </Center>
      <Center>
        {/* TODO: QRコードのvalue動的に変更させる */}
        <QRCodeSVG value="https://google.com" />
        <Button colorScheme="blue">verify credential</Button>
      </Center>
    </>
  );
};

export default Verifier;
