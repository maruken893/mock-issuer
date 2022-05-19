// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ION from "@decentralized-identity/ion-tools";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { keypair, Signer } from "../../lib/ion";
import jsonwebtoken from "jsonwebtoken";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

type Data = {
  vc: string;
};

const VALIDITY_IN_MINUTES = 3000;

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const signer = new Signer();
  await signer.init(keypair);

  const subjectIdToken = jsonwebtoken.decode(req.body);

  const vc = await ION.signJws({
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
        type: ["VerifiableCredential", "sclvc"],
        credentialSubject: {
          displayName: "Test",
          sponsorName: "BlockBase",
        },
        credentialStatus: {
          id: "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/card/status",
          type: "PortableIdentityCardServiceCredentialStatus2020",
        },
        exchangeService: {
          id: "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/card/exchange",
          type: "PortableIdentityCardServiceExchange2020",
        },
        revokeService: {
          id: "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/card/revoke",
          type: "PortableIdentityCardServiceRevoke2020",
        },
      },
      jti: uuidv4().toUpperCase(),
      iss: signer.did,
      sub: subjectIdToken.did,
      iat: moment().unix(),
      exp: moment().add(VALIDITY_IN_MINUTES, "minutes").unix(),
    },
    privateJwk: keypair.privateJwk,
  });

  await runMiddleware(req, res, cors);
  res.status(200).json({ vc });
}
