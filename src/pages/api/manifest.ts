// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { keypair, Signer } from "../../lib/ion";
import ION from "@decentralized-identity/ion-tools";
import moment from "moment";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

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

  // TODO: manifestをjsonでまとめrj

  const manifest = {
    id: "sclvcdev02",
    display: {
      locale: "en-US",
      contract:
        "https://beta.did.msidentity.com/v1.0/e16be63c-a759-44ad-b129-180fce46c1fb/verifiableCredential/contracts/sclvcdev02",
      card: {
        title: "BlockBase ID",
        issuedBy: "Obayashi",
        backgroundColor: "#afeeee",
        textColor: "#000000",
        logo: {
          uri: "https://1.bp.blogspot.com/-FfjY4DibSI4/VCIiuxKtLRI/AAAAAAAAmes/40lCg_r9U2g/s800/animal_inu.png",
          description: "BlockBase Employee ID card",
        },
        description:
          "Use your verified credential to prove to anyone that you know all about verifiable credentials.",
      },
      consent: {
        title: "Do you want to get your Verified Credential?",
        instructions: "Sign in with your account to get your card.",
      },
      claims: {
        "vc.credentialSubject.firstName": {
          type: "String",
          label: "First name",
        },
        "vc.credentialSubject.lastName": {
          type: "String",
          label: "Last name",
        },
        "vc.credentialSubject.displayName": {
          type: "String",
          label: "Display Name",
        },
        "vc.credentialSubject.sponsorName": {
          type: "String",
          label: "Sponsor Name",
        },
      },
      id: "display",
    },

    input: {
      credentialIssuer: process.env.BASE_URL + process.env.ISSUE_URL,
      issuer: signer.did,
      attestations: {
        idTokens: [
          {
            id: "https://self-issued.me",
            encrypted: false,
            claims: [
              {
                claim: "$.given_name",
                required: false,
                indexed: false,
              },
              {
                claim: "$.family_name",
                required: false,
                indexed: false,
              },
              {
                claim: "$.displayName",
                required: false,
                indexed: false,
              },
              {
                claim: "$.sponsorName",
                required: false,
                indexed: false,
              },
            ],
            required: false,
            configuration: "https://self-issued.me",
            client_id: "a36ec790-fd30-4c81-b43c-7515fa740cc0",
            redirect_uri: "vcclient://openid/",
          },
        ],
      },
      id: "input",
    },

    iss: signer.did,
    iat: moment().unix(),
  };
  await runMiddleware(req, res, cors);
  res.status(200).send(manifest);
}
