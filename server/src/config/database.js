import * as yup from 'yup';

const envVarsSchema = yup
  .object({
    DATABASE_URL: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    DATABASE_URL_TEST: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();

const config = () => {
  let envVars;
  try {
    envVars = envVarsSchema.validateSync(process.env);
  } catch (error) {
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  return {
    url:
      envVars.NODE_ENV === 'test'
        ? envVars.DATABASE_URL_TEST
        : envVars.DATABASE_URL,
  };
};

export default config;
