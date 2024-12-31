import * as yup from 'yup';

const envVarsSchema = yup
  .object({
    SQREEN_APP_NAME: yup.string().when('NODE_ENV', {
      is: 'production',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    SQREEN_TOKEN: yup.string().when('NODE_ENV', {
      is: 'production',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();

const config = () => {
  let envVars;
  try {
    envVars = envVarsSchema.validateSync(process.env, { stripUnknown: false });
  } catch (error) {
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }
  return {
    sqreenAppName: envVars.SQREEN_APP_NAME,
    sqreenToken: envVars.SQREEN_TOKEN,
  };
};

export default config;
