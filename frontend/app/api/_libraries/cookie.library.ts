import { cookies } from 'next/headers';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

// Define an encryption key. In a real-world application, store this securely.
const ENCRYPTION_KEY = process.env.FRONTEND_COOKIE_SECRET || ''; // Must be 32 characters for AES-256

/**
 * Encrypts the cookie value using AES-256.
 * @param value - The value to encrypt.
 * @returns Encrypted string.
 */
const encryptCookieValue = (value: string): string => {
  return AES.encrypt(value, ENCRYPTION_KEY).toString();
};

/**
 * Decrypts the cookie value using AES-256.
 * @param value - The value to decrypt.
 * @returns Decrypted string.
 */
const decryptCookieValue = (value: string): string => {
  const bytes = AES.decrypt(value, ENCRYPTION_KEY);
  return bytes.toString(Utf8);
};

/**
 * Sets an encrypted cookie.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional cookie attributes such as maxAge, path, etc.
 */
export const setEncryptedCookie = (name: string, value: string) => {
  const encryptedValue = encryptCookieValue(value);
  cookies().set(name, encryptedValue, { secure: true });
};

/**
 * Retrieves and decrypts a cookie by name.
 * @param name - The name of the cookie.
 * @returns The decrypted cookie value or null if not found.
 */
export const getDecryptedCookie = (name: string): string | null => {
  if (!cookies().has(name)) {
    return null;
  }

  const value = cookies().get(name)?.value as string;
  return decryptCookieValue(value);
};
