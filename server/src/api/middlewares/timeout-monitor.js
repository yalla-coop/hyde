import { Sentry } from '../../services/error-handler';

const timeoutMonitor = () => (req, res, next) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      Sentry.captureMessage('Request Timeout', {
        extra: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: req.body,
        },
      });
    }
  }, 30000);
  // eslint-disable-next-line no-param-reassign
  res.on('finish', () => clearTimeout(timeout));
  next();
};

export default timeoutMonitor;
