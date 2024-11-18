import { useEffect, createContext, useState, useContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Organisations } from '../api-calls';
import { Outlet, matchPath, useLocation } from 'react-router-dom';
import B from '../constants/benefit-calculator';
import { GENERAL } from './../constants/nav-routes';
import { Loading } from '../components';

import setColor from '../helpers/set-color-variations';
import formatColor from '../helpers/format-color';
import updateGradients from '../helpers/update-gradients';
import colors from '../theme/colors';

const initialPublicOrgState = {
  id: null,
  logoUrl: '',
  uniqueSlug: 'hyde-housing',
  colors: colors,
  contactLinks: [],
  benefitCalculatorLink: B.BENEFIT_CALCULATOR_LINK,
  benefitCalculatorLabel: B.BENEFIT_CALCULATOR_LABEL,
  organisationName: '',
  loading: true,
};

const PublicOrgContext = createContext({
  publicOrg: initialPublicOrgState,
  setPublicOrg: () => {},
  logout: () => {},
});

const adjustedTheme = (ancestorTheme, updatedColors) => ({
  ...ancestorTheme,
  colors: updatedColors,
  gradients: updateGradients(updatedColors),
});

// get help details/logo/colors
const PublicOrg = (props) => {
  const [publicOrg, setPublicOrg] = useState(initialPublicOrgState);
  const location = useLocation();

  const match = matchPath(
    { path: `${GENERAL.HOME_ORG}/*`, exact: false, strict: false },
    location.pathname
  );
  let { uniqueSlug } = match?.params || {};
  uniqueSlug =
    uniqueSlug && uniqueSlug !== 'accessibility' ? uniqueSlug : 'hyde-housing';

  const _setPublicOrg = (data) => {
    // set org in state
    setPublicOrg(data);
  };

  const updatedColors = ({ main, secondary }) => {
    if (!main || !secondary) {
      return colors;
    }

    const updated = {
      ...colors,
      primaryMain: formatColor(main),
      primaryMid: formatColor(setColor('primary', main).mid),
      primaryLight: formatColor(setColor('primary', main).light),
      secondaryMain: formatColor(secondary),
      secondaryMid: formatColor(setColor('secondary', secondary).mid),
      secondaryLight: formatColor(setColor('secondary', secondary).light),
      error: formatColor(main),
      borderPrimary: formatColor(main),
    };

    return updated;
  };

  const getPublicOrgInfo = async (uniqueSlug) => {
    const { data } = await Organisations.getOrganisationByUniqueSlug({
      uniqueSlug,
    });

    const defaultColors = {
      main: colors.primaryMainObj,
      secondary: colors.secondaryMainObj,
    };

    if (data) {
      _setPublicOrg({
        ...data,
        colors: updatedColors(data.colors || defaultColors),
        useBlockColors: data?.colors?.useBlockColors || false,
        loading: false,
      });
    } else {
      _setPublicOrg({ ...initialPublicOrgState, loading: false });
    }
  };

  useEffect(() => {
    getPublicOrgInfo(uniqueSlug);
    return () => _setPublicOrg(initialPublicOrgState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueSlug]);

  const value = {
    publicOrg,
    getPublicOrgInfo,
    setPublicOrg: _setPublicOrg,
  };

  if (publicOrg.loading) return <Loading type="page" />;
  return (
    <ThemeProvider theme={(theme) => adjustedTheme(theme, publicOrg.colors)}>
      <PublicOrgContext.Provider value={value} {...props} />
    </ThemeProvider>
  );
};

const usePublicOrg = () => {
  const value = useContext(PublicOrgContext);
  return value;
};

const PublicOrgProvider = () => {
  return (
    <PublicOrg>
      <Outlet />
    </PublicOrg>
  );
};

export { PublicOrgProvider, usePublicOrg };
export default PublicOrgContext;
