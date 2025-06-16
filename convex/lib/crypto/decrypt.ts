import { IV_LENGTH } from "backend/lib/crypto/constants";
import {
  base64ToArrayBuffer,
  getEncryptionKey
} from "backend/lib/crypto/utils";

async function decrypt(encryptedBase64: string) {
  const encryptionKey = await getEncryptionKey();
  const combinedBuffer = base64ToArrayBuffer(encryptedBase64);
  const iv = combinedBuffer.slice(0, IV_LENGTH);
  const cipherText = combinedBuffer.slice(IV_LENGTH);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    encryptionKey,
    cipherText
  );

  const secret = new TextDecoder().decode(decryptedBuffer);

  return secret;
}

export default decrypt;
