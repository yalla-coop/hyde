import { string, number, boolean, array, object } from 'yup';
import * as errMsgs from './err-msgs';
import './custom-functions';
import { whereDoYouNeedToGoTypes } from '../constants/data-types';

const URLregex =
  /^((https?):\/\/)?(www.)?[a-z0-9-_]+(\.[a-z-_]{2,}){1,3}(#?\/?[a-zA-Z0-9#-_]+)*\/?(\?[a-zA-Z0-9-_.-]+=[a-zA-Z0-9-%?&=.-_]+&?)?$/;
// const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
const URLSlugRegex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;

export const requiredText = string()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .required(errMsgs.DEFAULT_REQUIRED);

export const organisationName = string()
  .min(3, errMsgs.DEFAULT_REQUIRED)
  .max(40)
  .required(errMsgs.DEFAULT_REQUIRED);

export const firstName = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(20)
  .required(errMsgs.DEFAULT_REQUIRED);

export const lastName = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(20)
  .required(errMsgs.DEFAULT_REQUIRED);

export const email = string()
  .email(errMsgs.INVALID_EMAIL)
  .max(100, errMsgs.TOO_LONG_MAX_100)
  .required(errMsgs.DEFAULT_REQUIRED)
  .typeError(errMsgs.DEFAULT_REQUIRED);

export const password = string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
    errMsgs.SHORT_PASSWORD
  )
  .required(errMsgs.DEFAULT_REQUIRED);

export const loginPassword = string().required(errMsgs.DEFAULT_REQUIRED);

export const postcode = string()
  .required(errMsgs.DEFAULT_REQUIRED)
  .min(6, errMsgs.TOO_SHORT_MIN_5)
  .max(8, errMsgs.TOO_LONG_MAX_7)
  .matches(
    /\b(([a-z][0-9]{1,2})|(([a-z][a-hj-y][0-9]{1,2})|(([a-z][0-9][a-z])|([a-z][a-hj-y][0-9]?[a-z])))) [0-9][a-z]{2}\b/gi,
    errMsgs.INVALID_POSTCODE
  );

export const agreedOnTerms = boolean()
  .oneOf([true], errMsgs.SHOULD_AGREE_ON_TERMS)
  .required(errMsgs.DEFAULT_REQUIRED);

export const agreedAge = boolean()
  .oneOf([true], errMsgs.AGREED_AGE)
  .required(errMsgs.DEFAULT_REQUIRED);

export const arrayOfIds = array()
  .of(number())
  .min(1)
  .required(errMsgs.DEFAULT_REQUIRED)
  .typeError(errMsgs.DEFAULT_REQUIRED);

export const optionalText = string()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .nullable();

export const urlRequired = string()
  .matches(URLregex, {
    message: errMsgs.INVALID_LINK,
  })
  .required(errMsgs.DEFAULT_REQUIRED);

export const urlOptional = string().matches(URLregex, {
  message: errMsgs.INVALID_LINK,
  excludeEmptyString: true,
});

export const urlSlug = string()
  .required(errMsgs.DEFAULT_REQUIRED)
  .matches(URLSlugRegex, {
    message: errMsgs.INVALID_LINK,
  })
  .required(errMsgs.DEFAULT_REQUIRED);

export const description = string()
  .min(4, errMsgs.TOO_SHORT_MIN_4)
  .max(500, errMsgs.TOO_LONG_MAX_500)
  .required(errMsgs.DEFAULT_REQUIRED);

// SINGLE CONTENT FIELDS
export const title = string()
  .min(4, errMsgs.TOO_SHORT_MIN_4)
  .max(50)
  .required(errMsgs.DEFAULT_REQUIRED);

export const optionalArrayOfOptionalString = array().of(requiredText);

export const libraryContent = boolean()
  .oneOf([true, false])
  .required(errMsgs.DEFAULT_REQUIRED);

export const instructions = string()
  .min(4, errMsgs.TOO_SHORT_MIN_4)
  .max(1000)
  .required(errMsgs.DEFAULT_REQUIRED);

export const link = string().matches(URLregex, {
  message: errMsgs.INVALID_LINK,
});

export const docContent = string().min(4, errMsgs.DEFAULT_REQUIRED).max(1000);

export const inviteToken = string()
  .length(8)
  .required(errMsgs.DEFAULT_REQUIRED);

export const content = array().of(
  object().shape({
    title,
    categories: optionalArrayOfOptionalString,
    libraryContent,
    instructions,
  })
);

export const optionalPhoneNumber = string().when((value, schema) => {
  if (value) {
    return schema.phone();
  }
  return schema.nullable();
});

export const phoneNumber = string()
  .required(errMsgs.DEFAULT_REQUIRED)
  .when((value, schema) => {
    return schema.phone().typeError(errMsgs.INVALID_PHONE);
  });

export const postcodeLetters = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(2, errMsgs.AT_MOST_TWO_LETTERS)
  .required(errMsgs.DEFAULT_REQUIRED);

export const goalsArrayAtLeastOne = array()
  .of(
    object().shape({
      goal: string().required(errMsgs.DEFAULT_REQUIRED),
      category: string().required(errMsgs.DEFAULT_REQUIRED),
    })
  )
  .test('goals', errMsgs.AT_LEAST_ADD_ONE, (goals) => {
    return goals.some((goal) => goal.goal && goal.category);
  })
  .test('goals', errMsgs.All_required, (goals) => {
    return goals.length === 1
      ? true
      : goals.every((goal) => goal.goal && goal.category);
  });

export const biography = string().when('useMeanBio', {
  is: false,
  then: (schema) =>
    schema
      .typeError(errMsgs.DEFAULT_REQUIRED)
      .required(errMsgs.DEFAULT_REQUIRED),
  otherwise: (schema) => schema.typeError(errMsgs.DEFAULT_REQUIRED).nullable(),
});

export const optionalCheckbox = boolean()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .nullable();

export const videoLink = string().when('video', {
  is: (v) => v.name && v.key && v.url,
  then: (schema) => schema.typeError(errMsgs.DEFAULT_REQUIRED).nullable(),
  otherwise: (schema) =>
    schema
      .matches(URLregex, {
        message: errMsgs.INVALID_LINK,
      })
      .required(errMsgs.DEFAULT_REQUIRED),
});

export const numberField = number()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .required(errMsgs.DEFAULT_REQUIRED);

export const optionalRate = number().when('noDemos', {
  is: true,
  then: (schema) => schema.nullable(),
  otherwise: (schema) =>
    schema
      .typeError(errMsgs.DEFAULT_REQUIRED)
      .required(errMsgs.DEFAULT_REQUIRED),
});

export const textMax300Required = string()
  .min(4, errMsgs.TOO_SHORT_MIN_4)
  .max(300, errMsgs.TOO_LONG_MAX_300)
  .required(errMsgs.DEFAULT_REQUIRED);

// step form

// export const optionalPhoneNumber = string().when((value, schema) => {
//   if (value) {
//     return schema.phone();
//   }
//   return schema.nullable();
// });

export const linkOrPhone = string().when('type', {
  is: whereDoYouNeedToGoTypes.PHONE,
  then: (schema) =>
    schema.when((value, schema) => {
      if (value) {
        return schema.phone();
      }
      return schema.nullable();
    }),
  otherwise: (schema) =>
    schema.matches(URLregex, {
      message: errMsgs.INVALID_LINK,
      excludeEmptyString: true,
    }),
});

export const whereDoYouNeedToGo = object().shape({
  type: optionalText,
  link: linkOrPhone,
  title: optionalText,
});

export const thingsContent = array().of(
  object().shape({
    title: requiredText,
    description: optionalText,
    thisCanInclude: array().of(string().nullable()).nullable(),
    tips: array().of(string().nullable()).nullable(),
  })
);

export const contactLinks = array()
  .of(
    object().shape({
      type: requiredText,
      availability: requiredText,
      description: requiredText,
      link: string().when('type', {
        is: (v) => v === 'WEBCHAT_LINK',
        then: (schema) =>
          schema
            .matches(URLregex, {
              message: errMsgs.INVALID_LINK,
            })
            .required(errMsgs.DEFAULT_REQUIRED),
        otherwise: (schema) => schema.nullable(),
      }),
      phoneNumber: string().when('type', {
        is: (v) => v === 'PHONE',
        then: (schema) => schema.phone().required(errMsgs.DEFAULT_REQUIRED),
        otherwise: (schema) => schema.optionalPhone(),
      }),
      email: string().when('type', {
        is: (v) => v === 'EMAIL',
        then: (schema) =>
          schema
            .email(errMsgs.INVALID_EMAIL)
            .max(100, errMsgs.TOO_LONG_MAX_100)
            .required(errMsgs.DEFAULT_REQUIRED)
            .typeError(errMsgs.DEFAULT_REQUIRED),
        otherwise: (schema) => schema.nullable(),
      }),
    })
  )
  .nullable();

export const hexColorOptional = string().when((value, schema) => {
  return schema.nullable();
});

export const hexColor = string().required(errMsgs.DEFAULT_REQUIRED);

export const hslColor = object().shape({
  h: string().required(),
  s: string().required(),
  l: string().required(),
});
