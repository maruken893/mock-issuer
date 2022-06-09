// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import ION from "@decentralized-identity/ion-tools";
import { keypair, Signer } from "../../lib/ion";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Cors from "cors";

import { runMiddleware } from "../../lib/cors";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

type Data = {
  vc: string;
};

const VALIDITY_IN_MINUTES = 3000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let vc;
  if (req.method === "POST") {
    // TODO: VCの検証
    // TODO: 受け取ったVCを使う
    const decodedJwt = jwt.decode(req.body);
    const recipientDid = decodedJwt.recipient;
    const signer = new Signer();
    await signer.init(keypair);
    vc = await ION.signJws({
      header: {
        typ: "JWT",
        alg: "ES256K",
        kid: `${signer.did}#signingKey`,
      },
      payload: {
        vc: {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/contracts/sclvcdev02",
          ],
          type: ["VerifiableCredential", "BlockBaseVC"],
          credentialSubject: {
            displayName: "Test",
            sponsorName: "BlockBase",
          },
          credentialStatus: {
            id: "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/card/status",
            type: "PortableIdentityCardServiceCredentialStatus2020",
          },
          exchangeService: {
            id: process.env.BASE_URL + process.env.VC_EXCHANGE_URL,
            type: "PortableIdentityCardServiceExchange2020",
          },
          revokeService: {
            id: "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/card/revoke",
            type: "PortableIdentityCardServiceRevoke2020",
          },
        },
        jti: uuidv4().toUpperCase(),
        iss: signer.did,
        sub: recipientDid,
        iat: moment().unix(),
        exp: moment().add(VALIDITY_IN_MINUTES, "minutes").unix(),
      },
      privateJwk: keypair.privateJwk,
    });
  }
  await runMiddleware(req, res, cors);
  if (vc !== undefined) {
    res.status(200).json({ vc });
  } else {
    res.status(500);
  }
}
