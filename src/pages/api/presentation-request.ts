// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ION from "@decentralized-identity/ion-tools";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { keypair, Signer } from "../../lib/ion";

const VALIDITY_IN_MINUTES = 30;

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const signer = new Signer();
  await signer.init(keypair);

  const issueRequest = await ION.signJws({
    header: {
      typ: "JWT",
      alg: "ES256K",
      kid: `${signer.did}#signingKey`,
    },
    payload: {
      response_type: "id_token",
      response_mode: "form_post",
      client_id: process.env.BASE_URL + process.env.PRESENT_URL,
      scope: "openid did_authn",
      nonce: "TuX9iA+WJ6LFa9q75Tlh/w==",
      registration: {
        client_name: "Node.js SDK API Verifier",
        client_purpose: "the purpose why the verifier asks for one or more VCs",
        subject_id_types_supported: ["did"],
        credential_format_supported: ["jwt"],
      },
      presentation_definition: {
        input_descriptors: [
          {
            id: "BlockBaseVC",
            purpose: "the purpose why the verifier asks for a VC",
            schema: {
              uri: ["BlockBaseVC"],
            },
            issuance: [
              {
                // TODO: 現状manifiestがわからない状態
                manifest: "",
              },
            ],
          },
        ],
      },
      iss: signer.did,
      iat: moment().unix(),
      jti: uuidv4().toUpperCase(),
      exp: moment().add(VALIDITY_IN_MINUTES, "minutes").unix(),
      state:
        "djEU1GKrSpXo5HTuYl6lEMSiYIm0LdPZ4USiD0Y3jlhAtFkU58LEhg2QDkD8EPsnwjvWPhNmYUjHHgndG65eWXGl5eewA1FB9j9Mf1Pd2w3uw47OBiZSs+AWXWSVBNWtFzr2Ouj5EWyjXSzJDKP6UFfIg6pSPjHFZT20DPrQp3xxA8rKbp5hITDQmnNMr8k1gTFS9E3uGzguPq/CiO0S/MMUQPd+h54qQwbGs2/i3a3w7Hn2mIXc4a0H9/cVdOSFUI11XZN6oo2glGS7xde15g+10CUj7Bw56hAfcYefzUFd68lr6DvCpmw41M6GHNQM5+o9hP0KwTh+PLRTQee2gS0ZwTuRtoDf00VpFMI+YYv+vpjfCtef9gcnvjkP9t2+MgSSP0WDFS3PFGBN8nimobCA9Zb89jf4jSWy1TdHtYvAeMuwviIlSYdPFV+wxqglfxHAtN3QRAfa4bfvxYwYScCaRGKCPuMvARUfJk3l75HEHwRiF1jJEh1r8WWx41veTRlUAMWHpPIzUGdW2hbDLjuL9Fbvh4o27cJiuqLsSupOPDWT9LCWjuU82XCk0ffc9z0agrNyMARBgunedVaoC3xDi++CF68LjNGsPOuewF2r5ujUtSbVLbxs9XGfsiS0KMSkDwqzRTV3GjOoXmKuBIksr9LhLZwJYgSId9lJrRmI5PtVAwWRgjWzqxvtvCNxLm2pUx3CuAqHxEe2hUYp8PvQYS/wOx5iUNyECS6G2bMCbCvE69nZ5zecjP5LsHpONg62ihQvOPRict+hpenL+uKEa0y+MBaw9hbhUyQojTVFSrt3lOx5DsTnayccJ0xeh4V258p31eRln33dYBI/+hSDnDx+nQc7xdTKIQCbrFWDcmB6G0I3uwo2xiX0xvJhj7UBouvnv+QSwv8SZe/SQLVGpTyMryDT5yjyHAJgHDRb/8qZF6kGFuxjsiOP6dyrDiCow/FPSb/EHtMA3VlGqjDKdNZ9Ci3ru4vE50SETsg6SihXUPq2Cz2p8qYtbuH+zBrqrLSleSQzTRY123IjUz163dNG70ngptx+vb1KbqdoGE7lC/B0legfbmW/jzWI+H0o25cRcRKSVxUjHFI5nwFkUhtCxJSGbVeTM9GyCTs1/mg0wxj2SO0/4VrE8OxuxgNg6auhFn7h1GNZLKDNz6il6mcFYeqIxcsgnHzyT2/9BkHyU9/JemdCte5o0AVBeqdo4CXsOujA3R5CxJ8wBID39NNb9aGomwXUgvssl/ge9InjKE1Y42NLoTPv2Wk8yg7tvtpxOF3c4lDSk4JxZqFKHQBEeUA9tTKoagQViTmgz8/FDHLFpPexedEgOB2mTAIqqVkPufr+ItZQDBymA55nee7nQkDcWBTImx1ADbiXvY6GA6s2wkatA8JxsoYZJgDez0soRHbnPZ7SkE7tniiYxK1nfAvNv3kGpoPgdPQ6hzK4bt8/PBAWtitX4BPTCju4Bf1v70DSfKHNHuOz7ZBipjBtE1G3gk/j5CsRpnv6sxeH8WQRDPtygTITpXkZoEJuCfFy33yuxk+PGpSIHzbQ0ZNwoK1gtwgtUcdhCv6FWU8KZCnhenGJ8ZC8DlA8SJ+RCF58TL/LR+9cqQpq5RhAof1BrBxCwHDVoXfUU8VdegT+ZLaTD+1SFgudAOd+tYFF31Ac0dMhXxSH0gL5wbeM/pFcfK33YVTQLimQy/ilGxS24nZ6Lx+5",
      id_token_hint:
        "eyJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpRGl2cC1pYS1JUVMxM2VGc21rampUUU9GY1RLaHJfcnd5MnIyeEZSSE5GUVE6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKemFXZGZaVEU0TnpVNU5EQWlMQ0p3ZFdKc2FXTkxaWGxLZDJzaU9uc2lZM0oySWpvaWMyVmpjREkxTm1zeElpd2lhM1I1SWpvaVJVTWlMQ0o0SWpvaVUyYzVXbEpNWVhsTlYwUkJRWHBWWlVwb2RGUjFSbTlJTW5WcExWTTRZbU5ZVlc1M1dVUlplVmREYXlJc0lua2lPaUkzVXpOaWIwZDBWbmRtU0hoSWR6bFVNbVZTWm5sWVRGTXpZMWxLVEc1cWRXeERPVlo2UkhWcFNqZzBJbjBzSW5CMWNuQnZjMlZ6SWpwYkltRjFkR2hsYm5ScFkyRjBhVzl1SWl3aVlYTnpaWEowYVc5dVRXVjBhRzlrSWwwc0luUjVjR1VpT2lKRlkyUnpZVk5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGtpZlYwc0luTmxjblpwWTJWeklqcGJleUpwWkNJNklteHBibXRsWkdSdmJXRnBibk1pTENKelpYSjJhV05sUlc1a2NHOXBiblFpT25zaWIzSnBaMmx1Y3lJNld5Sm9kSFJ3Y3pvdkwzTmpiQzEyWXkxM1pXSmhjSEF1WVhwMWNtVjNaV0p6YVhSbGN5NXVaWFF2SWwxOUxDSjBlWEJsSWpvaVRHbHVhMlZrUkc5dFlXbHVjeUo5WFgxOVhTd2lkWEJrWVhSbFEyOXRiV2wwYldWdWRDSTZJa1ZwUWs1UE9XNTNVMUpWZFZSeWJFRmFRemRUWW5ORFJraFVUMGRtVkZsT2IyNXBlR1I2Y0ZKSVIwRndVVUVpZlN3aWMzVm1abWw0UkdGMFlTSTZleUprWld4MFlVaGhjMmdpT2lKRmFVSlJUekpOTWpoWVdtRkVNMlpTVURSc2MwWk1Na1JmZEZsdWRpMVZXVWRCTlZwTFpIZHBiREZIZEROM0lpd2ljbVZqYjNabGNubERiMjF0YVhSdFpXNTBJam9pUldsQlJuZHRkRUZLY0RJMVdGQjVhV2w2YVVSUFZVMHRRVVJ0U1dWa2JYTTBOMmh3WmpkMWFtMU9jMEV6VVNKOWZRI3NpZ19lMTg3NTk0MCIsInR5cCI6IkpXVCJ9",
    },
    privateJwk: keypair.privateJwk,
  });
  res.status(200).send(issueRequest);
}
