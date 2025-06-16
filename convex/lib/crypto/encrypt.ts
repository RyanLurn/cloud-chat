import { ALGORITHM, IV_LENGTH } from "backend/lib/crypto/constants";
import { getEncryptionKey, uint8ArrayToBase64 } from "backend/lib/crypto/utils";

async function encrypt(secret: string) {
  const encryptionKey = await getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encodedSecret = new TextEncoder().encode(secret);

  const cipherText = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    encryptionKey,
    encodedSecret
  );

  const combinedBuffer = new Uint8Array(iv.length + cipherText.byteLength);
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(cipherText), iv.length);

  const combinedString = uint8ArrayToBase64(combinedBuffer);

  return combinedString;
}

export default encrypt;
