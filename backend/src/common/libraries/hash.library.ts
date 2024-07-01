import * as bcrypt from 'bcrypt';

/**
 * Hashes the given string
 * @param   {string} str
 * @returns {Promise<string>}
 */
export const hash = async (str: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(str, saltRounds);
};

/**
 * Compares the plain and hashed texts
 * @param   {string} plain
 * @param   {string} hashed
 * @returns {Promise<boolean>}
 */
export const compare = async (
  plain: string,
  hashed: string,
): Promise<boolean> => {
  return await bcrypt.compare(plain, hashed);
};
