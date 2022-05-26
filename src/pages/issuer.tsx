import type { NextPage } from "next";
import { Button, Center, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";

const Issuer: NextPage = () => {
  return (
    <>
      <Center>
        <Text fontSize="5xl">issuer</Text>
      </Center>
      <Center>
        {/* TODO: QRコードのvalue動的に変更させる */}
        <QRCodeSVG
          value={
            process.env.VC_REQUEST_URL
              ? "openid://vc/?request_uri=" +
                process.env.BASE_URL +
                process.env.VC_REQUEST_URL
              : ""
          }
        />
        <Button colorScheme="blue">get credential</Button>
      </Center>
    </>
  );
};

export default Issuer;
