// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { keypair, Signer } from "../../lib/testWallet";

type Data = {
  did: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const signer = new Signer();
  await signer.init(keypair);
  console.log(signer.did);
  res.status(200).json({ did: signer.did });
}
