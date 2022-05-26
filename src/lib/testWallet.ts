import ION from "@decentralized-identity/ion-tools";
import { JWK } from "jose/jwk/thumbprint";

export interface KeyPair {
  publicJwk: JWK;
  privateJwk: JWK;
}

export const keypair: KeyPair = {
  publicJwk: {
    kty: "EC",
    crv: "secp256k1",
    x: "rL8Tk9NvUpkVwF0CqTeNRBKH5DxkYt0QWb5zmiwQQdQ",
    y: "H5ruHCsWu8hbgmQRFl1nH5PlaVQmikVM3ftfUHzaMH4",
  },
  privateJwk: {
    kty: "EC",
    crv: "secp256k1",
    d: "H-8ZValLCGfnvo4BghrzJiyQS9gvkOhtfCUmdFgdiFg",
    x: "rL8Tk9NvUpkVwF0CqTeNRBKH5DxkYt0QWb5zmiwQQdQ",
    y: "H5ruHCsWu8hbgmQRFl1nH5PlaVQmikVM3ftfUHzaMH4",
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
