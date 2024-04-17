/* eslint-disable no-param-reassign */
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import app from '../../express-app';

import config from '../../config';
import * as constants from '../../constants';

const { PRODUCTION } = constants.envTypes;

if (config.common.env === PRODUCTION) {
  Sentry.init({
    dsn: config.common.sentryDNS,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 0.5,
    beforeSend(event, hint) {
      const exception = hint.originalException;

      if (exception && exception.message) {
        if (exception.message.includes('invalid input syntax for type')) {
          event.fingerprint = ['invalid input syntax for type'];
        } else {
          event.fingerprint = ['{{ default }}', String(exception.message)];
        }
      }
      return event;
    },
  });
}

export default Sentry;
