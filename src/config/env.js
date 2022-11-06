import dotenv from 'dotenv';

export const getEnv = (key = '') => {
  const vars = dotenv.config();
  const processEnv = {};
  for (const key in vars) processEnv[key] = vars[key];
  return key ? processEnv.parsed[key] : processEnv.parsed;
};
