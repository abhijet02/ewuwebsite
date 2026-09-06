import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = process.env.NEXT_PUBLIC_DEGREEVERIFICATION_SECRET_KEY; // Never hardcode this in production

export const encryptPayload = (payload: object): string => {
  const ciphertext = AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
  return ciphertext;
};