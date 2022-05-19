import ION from "@decentralized-identity/ion-tools";
import { JWK } from "jose";

export interface KeyPair {
  publicJwk: JWK;
  privateJwk: JWK;
}

export const keypair: KeyPair = {
  publicJwk: {
    kty: "EC",
    crv: "secp256k1",
    x: "5cJcnupyti4hcQEQBWgJAIdsxPPElo1GRt0-mGSCUBs",
    y: "k1dpnuw7SVAzHpC9BAgy2znftNtUEmxINtV9fC5NI4E",
  },
  privateJwk: {
    kty: "EC",
    crv: "secp256k1",
    d: "CoWVrOPTbMxDBs_3ztwOL4xCazwck6XzOcTaAlDrYZk",
    x: "5cJcnupyti4hcQEQBWgJAIdsxPPElo1GRt0-mGSCUBs",
    y: "k1dpnuw7SVAzHpC9BAgy2znftNtUEmxINtV9fC5NI4E",
  },
};

export class Signer {
  did: string;
  keyPair: KeyPair;

  init = async (keyPair: KeyPair): Promise<void> => {
    this.keyPair = keyPair;
    const did = new ION.DID({
      ops: [
        {
          operation: "create",
          content: {
            publicKeys: [
              {
                id: "signingKey",
                type: "EcdsaSecp256k1VerificationKey2019",
                publicKeyJwk: keyPair.publicJwk,
                purposes: ["authentication"],
              },
            ],
          },
          recovery: keyPair,
          update: keyPair,
        },
      ],
    });
    this.did = await did.getURI();
  };
}
