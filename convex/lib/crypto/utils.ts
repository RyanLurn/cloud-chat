import { ALGORITHM } from "backend/lib/crypto/constants";
import { env } from "backend/lib/crypto/env";

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);

  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

async function getEncryptionKey(): Promise<CryptoKey> {
  const encryptionKeyBase64 = env.ENCRYPTION_KEY;
  const keyBuffer = base64ToArrayBuffer(encryptionKeyBase64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );

  return cryptoKey;
}

export { base64ToArrayBuffer, uint8ArrayToBase64, getEncryptionKey };
