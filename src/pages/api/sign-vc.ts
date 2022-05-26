// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ION from "@decentralized-identity/ion-tools";
import { keypair, Signer } from "../../lib/testWallet";

type Data = {
  signedVc: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const signer = new Signer();
  await signer.init(keypair);
  const signedVc = await ION.signJws({
    header: {
      typ: "JWT",
      alg: "ES256K",
      kid: "did:ion:EiAAORzyJQFawBj0AjNzaF1c3TFXjxLDtr5-fBCa5zaYUQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduaW5nS2V5IiwicHVibGljS2V5SndrIjp7ImNydiI6InNlY3AyNTZrMSIsImt0eSI6IkVDIiwieCI6IjVjSmNudXB5dGk0aGNRRVFCV2dKQUlkc3hQUEVsbzFHUnQwLW1HU0NVQnMiLCJ5IjoiazFkcG51dzdTVkF6SHBDOUJBZ3kyem5mdE50VUVteElOdFY5ZkM1Tkk0RSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiRWNkc2FTZWNwMjU2azFWZXJpZmljYXRpb25LZXkyMDE5In1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDeW8yNVF0Q1dzVmQwdHZVaWtCaFBWMnFMalA5ZFRtQXNMbGZxMnhjbGttUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHh0NmpCWkRuYkxLRkp1ZzVyX1Nma0RpUEhPZkoxcUZLLVJhaVgzeEJxNGciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUN5bzI1UXRDV3NWZDB0dlVpa0JoUFYycUxqUDlkVG1Bc0xsZnEyeGNsa21RIn19#signingKey",
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
      jti: "B23513AC-6EC2-417A-8B0A-0E4760DC9F61",
      iss: "did:ion:EiAAORzyJQFawBj0AjNzaF1c3TFXjxLDtr5-fBCa5zaYUQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduaW5nS2V5IiwicHVibGljS2V5SndrIjp7ImNydiI6InNlY3AyNTZrMSIsImt0eSI6IkVDIiwieCI6IjVjSmNudXB5dGk0aGNRRVFCV2dKQUlkc3hQUEVsbzFHUnQwLW1HU0NVQnMiLCJ5IjoiazFkcG51dzdTVkF6SHBDOUJBZ3kyem5mdE50VUVteElOdFY5ZkM1Tkk0RSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiRWNkc2FTZWNwMjU2azFWZXJpZmljYXRpb25LZXkyMDE5In1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDeW8yNVF0Q1dzVmQwdHZVaWtCaFBWMnFMalA5ZFRtQXNMbGZxMnhjbGttUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHh0NmpCWkRuYkxLRkp1ZzVyX1Nma0RpUEhPZkoxcUZLLVJhaVgzeEJxNGciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUN5bzI1UXRDV3NWZDB0dlVpa0JoUFYycUxqUDlkVG1Bc0xsZnEyeGNsa21RIn19",
      sub: "did:ion:EiBcRm_IVRVAHXM13dVPwP6YH9jQVIDlw8tlIw4cwLigKA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduaW5nS2V5IiwicHVibGljS2V5SndrIjp7ImNydiI6InNlY3AyNTZrMSIsImt0eSI6IkVDIiwieCI6InJMOFRrOU52VXBrVndGMENxVGVOUkJLSDVEeGtZdDBRV2I1em1pd1FRZFEiLCJ5IjoiSDVydUhDc1d1OGhiZ21RUkZsMW5INVBsYVZRbWlrVk0zZnRmVUh6YU1INCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiRWNkc2FTZWNwMjU2azFWZXJpZmljYXRpb25LZXkyMDE5In1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBeElnVlpzb0xiS1J2dmZOVmE2YWZOdGJkTzZqNEE2SmY3c2t5Q2RmckdJQSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQ1BnQTBrSFV3M3FiYnNIb0gtTGxrUGJ6ZjhPX1QydVh6bnhFYTdzSDRrUEEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUF4SWdWWnNvTGJLUnZ2Zk5WYTZhZk50YmRPNmo0QTZKZjdza3lDZGZyR0lBIn19",
      iat: 1653368788,
      exp: 1653548788,
    },
    privateJwk: keypair.privateJwk,
  });
  console.log(signedVc);
  res.status(200).json({ signedVc });
}
