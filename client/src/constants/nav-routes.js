const GENERAL = {
  HOME: '/',
  HOME_ORG: '/:uniqueSlug',
  STEP_ORG: '/:uniqueSlug/steps/:slug',
  UNAUTHORIZED: '/unauthorized',
  FORGET_PASSWORD: '/admin/forget-password',
  RESET_PASSWORD: '/admin/reset-password/:token',
  NOT_FOUND: '/not-found',
  ACCESSIBILITY: `/accessibility`,
};

const admin = '/admin';
const ADMIN = {
  BASE: `${admin}`,
  EDIT_ACCOUNT_DETAILS: `${admin}/edit-details`,
  CUSTOMISE: `${admin}/customise`,
  CUSTOMISE_RESOURCES: `${admin}/customise-resources`,
  CREATE_UNIQUE_LINK: `${admin}/create-unique-link`,
  CREATE_UNIQUE_LINK_SUCCESS: `${admin}/create-unique-link/success`,
  SIGNUP: `${admin}/signup`,
  LOGIN: `${admin}/login`,
  PREVIEW_STEP: `${admin}/preview-step`,
  DELETE_STEP: `${admin}/delete-step`,
  WELCOME: `${admin}/welcome`,
  DASHBOARD: `${admin}/dashboard`,
  MANAGE_STEPS: `${admin}/edit-steps`,
  CREATE_ORG_DETAILS_FIRST_STEP: `${admin}/set-organisation/1`,
  CREATE_ORG_DETAILS_SECOND_STEP: `${admin}/set-organisation/2`,
  ADD_UPDATE_CONTENT: `${admin}/content`,
  SUCCESS_SIGNUP: `${admin}/success-signup`,
  CONFIRM_DELETION: `${admin}/confirm-deletion`,
};

const SUPER_ADMIN = {
  DASHBOARD: `${admin}/dashboard`,
  EDIT_STEP: `${admin}/edit-step/:slug`,
  HOME: `${admin}/home`,
  ADD_UPDATE_CONTENT: `${admin}/content`,
  EDIT_LANDING_PAGE: `${admin}/edit-landing-page`,
  EDIT_ACCOUNT_DETAILS: `${admin}/edit-details`,
  ORGANISATIONS: `${admin}/organisations`,
  CUSTOMISE: `${admin}/customise`,
  MANAGE_STEPS: `${admin}/manage-steps`,
  CHANGES: `${admin}/changes`,
  REJECT_ORGANISATION: `${admin}/organisation/:id/reject`,
  // CONTENT_REQUESTS: `${admin}/content-requests`,
  CONTENT_REVIEW: `${admin}/content-review`,
  ORGANISATION_DETAILS: `${admin}/org-user/:id`, // use user id not org id
};

const EXTERNAL = {
  TERMS_OF_USE:
    'https://www.hyde-housing.co.uk/privacy/hyde-foundation-privacy/hyde-foundation-digital-tools-terms-of-use/',
  PRIVACY_POLICY:
    'https://www.hyde-housing.co.uk/privacy/hyde-foundation-privacy/',
  CALL_US: '//www.google.com/',
  ELIGIBILITY_CALCULATOR: 'https://benefits-calculator.turn2us.org.uk/',
  CREATE_UNIVERSAL_CREDIT_ACCOUNT:
    'https://www.universal-credit.service.gov.uk',
  // GOV_UK_VERIFY: '//www.google.com/GOV_UK_VERIFY',
  ONLINE_APPLICATION_FORM: 'https://www.universal-credit.service.gov.uk',
  MAKE_YOUR_CLAIM: 'https://www.universal-credit.service.gov.uk/sign-in',
  GETTING_YOUR_FIRST_PAYMENT: 'https://www.universal-credit.service.gov.uk',
  Call_0800_328_5644: 'tel:0800 328 5644',
  DEMO_VIDEO: 'https://www.loom.com/share/4367b7586cc24c0fad366fa7ba7805c5',
  ACCESSABILITY_GUIDELINES: 'https://webaim.org/resources/contrastchecker/',
  HYDE_EMAIL: 'UCdigital@hyde-housing.co.uk',
  CHROME_GOOGLE_SPEAK:
    'https://chrome.google.com/webstore/detail/voice-in-voice-typing/pjnefijmagpdjfhhkpljicbbpicelgko',
  VOICE_ALOUD_READER_ANDROID:
    'https://play.google.com/store/apps/details?id=com.hyperionics.avar&utm_source=allhunan.com',
  VOICE_ALOUD_READER_APPLE:
    'https://apps.apple.com/us/app/voice-aloud-reader/id1446876360',
  APPLE_ACCESSIBILITY:
    'https://www.apple.com/uk/accessibility/#:~:text=AssistiveTouch%20%2B%20Apple%20Watch,-AssistiveTouch%20for%20Apple&text=Answer%20incoming%20calls%2C%20control%20an,Centre%2C%20Control%20Centre%20and%20more.&text=You%20can%20also%20use%20AssistiveTouch,Control%20settings%20on%20your%20iPhone.',
  ANDROID_ACCESSIBILITY:
    'https://support.google.com/accessibility/android/answer/6006564?hl=en',
  COST_OF_LIVING: 'https://col-helper.co.uk/',
};

export { GENERAL, EXTERNAL, ADMIN, SUPER_ADMIN };
