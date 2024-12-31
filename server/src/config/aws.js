import * as yup from 'yup';

const envVarsSchema = yup
  .object({
    BUCKET: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    BUCKET_REGION: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    AWS_ACCESS_KEY_ID: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    AWS_SECRET_ACCESS_KEY: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
    }),
    AWS_REGION: yup.string().when('NODE_ENV', {
      is: 'test',
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(),
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
    bucket: envVars.BUCKET,
    bucketRegion: envVars.BUCKET_REGION,
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsRegion: envVars.AWS_REGION,
  };
};

export default config;
