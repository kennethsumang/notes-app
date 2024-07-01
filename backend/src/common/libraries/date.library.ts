import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Gets the current utc timestamp
 * @returns {string}
 */
export const getCurrentUtc = (): string => {
  return dayjs().utc().toISOString();
};
