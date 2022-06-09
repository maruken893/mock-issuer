// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ION from "@decentralized-identity/ion-tools";

type Data = {
  keypair: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let keypair = await ION.generateKeyPair();
  res.status(200).json({ keypair });
}
