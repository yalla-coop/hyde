import axios from 'axios';
import handleError from './format-error';

const LANDING_PAGE_CONTENT_BASE = '/landing-pages';

const getLandingPageContent = async ({ options }) => {
  try {
    const { data } = await axios.get(`${LANDING_PAGE_CONTENT_BASE}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getLandingPageContent };
