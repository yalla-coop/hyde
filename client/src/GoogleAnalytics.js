import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './helpers';

const GoogleAnalytics = ({ ReactGA, isProduction }) => {
  const { lng } = useLanguage();

  const location = useLocation();
  useEffect(() => {
    if (isProduction)
      if (ReactGA?.isInitialized) {
        ReactGA.send({
          hitType: 'pageview',
          page: location.pathname + location.search,
          language: lng,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, ReactGA]);
};

export default GoogleAnalytics;
