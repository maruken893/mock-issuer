import type { NextPage } from "next";
import { Center, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";

const Verifier = () => {
  return (
    <>
      <Center>
        <Text fontSize="5xl">verifier</Text>
      </Center>
      <Center>
        {/* TODO: QRコードのvalue動的に変更させる */}
        <QRCodeSVG
          value={
            process.env.VC_PRESENTATION_URL
              ? "openid://vc/?request_uri=" +
                process.env.BASE_URL +
                process.env.VC_PRESENTATION_URL
              : ""
          }
        />
      </Center>
    </>
  );
};

export default Verifier;
