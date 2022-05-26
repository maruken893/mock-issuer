// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ION from "@decentralized-identity/ion-tools";
import jwt from "jsonwebtoken";
import qs from "querystring";
import Cors from "cors";

import { runMiddleware } from "../../lib/cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // TODO: verifyする機能の開発.
    const { id_token } = req.body;
    console.log(id_token);
    const decoded_id_toeken = jwt.decode(id_token);
    await runMiddleware(req, res, cors);
    res.status(200).send({ status: "OK!" });
  }
}
