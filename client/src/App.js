import { useEffect } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme, { globalStyle } from './theme';
import { Route as CustomRoute } from './components';
import * as Pages from './pages';
import { navRoutes } from './constants';
import { ScrollToTop } from './helpers';
import StepsProvider from './context/steps';
import { AuthProvider } from './context/auth';
import { PublicOrgProvider } from './context/public-org';
import { createBrowserHistory } from 'history';
import AccessibilityProvider from './context/accessibility';
import { CommonProvider } from './context/common';
import hotJarConfig from './hotJarConfig';
import 'antd/dist/antd.css';
import CookieBot from 'react-cookiebot';
import GoogleAnalytics from './GoogleAnalytics';

const domainGroupId = 'b3a35499-2627-481c-8669-f1ee39a3071c';

export const history = createBrowserHistory({ basename: window.BASE_URL });

const isProduction = process.env.NODE_ENV === 'production';

function App({ ReactGA }) {
  useEffect(() => {
    if (isProduction) {
      hotJarConfig(
        window,
        document,
        'https://static.hotjar.com/c/hotjar-',
        '.js?sv='
      );
    }
  }, []);

  useEffect(() => {
    localStorage.getItem('isFontLarge') === 'true'
      ? (document.getElementsByTagName('html')[0].style.fontSize = '1.25rem')
      : (document.getElementsByTagName('html')[0].style.fontSize = '1rem');
  }, []);
  return (
    <div className="app">
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <AccessibilityProvider>
          <AuthProvider>
            <Router basename={process.env.PUBLIC_URL}>
              <StepsProvider>
                <GoogleAnalytics
                  isProduction={isProduction}
                  ReactGA={ReactGA}
                />
                <ScrollToTop />
                <Routes>
                  <Route
                    path={navRoutes.GENERAL.NOT_FOUND}
                    element={
                      <CustomRoute
                        Component={<p>Page Not Found</p>}
                        layout="general"
                      />
                    }
                  />
                  <Route
                    exact
                    path={navRoutes.ADMIN.LOGIN}
                    element={
                      <CustomRoute
                        Component={Pages.Login}
                        layout="splitScreen"
                        side="left"
                        gradient="secondary"
                        publicOnly
                      />
                    }
                  />
                  <Route
                    exact
                    path={navRoutes.ADMIN.SIGNUP}
                    element={
                      <CustomRoute
                        Component={Pages.Signup}
                        layout="splitScreen"
                        side="left"
                        gradient="secondary"
                        publicOnly
                      />
                    }
                  />
                  <Route
                    exact
                    path={navRoutes.GENERAL.FORGET_PASSWORD}
                    element={
                      <CustomRoute
                        Component={Pages.ForgotPassword}
                        layout="splitScreen"
                        side="left"
                        gradient="secondary"
                      />
                    }
                  />
                  <Route
                    exact
                    path={navRoutes.GENERAL.RESET_PASSWORD}
                    element={
                      <CustomRoute
                        Component={Pages.ResetPassword}
                        layout="splitScreen"
                        side="left"
                        gradient="secondary"
                      />
                    }
                  />
                </Routes>

                {/* ALL ADMIN PAGES */}
                <Pages.Admin />

                <Routes>
                  <Route element={<PublicOrgProvider />}>
                    <Route element={<CommonProvider />}>
                      <Route
                        exact
                        path={navRoutes.GENERAL.ACCESSIBILITY}
                        element={
                          <CustomRoute
                            Component={Pages.Accessibility}
                            layout="general"
                            showBack
                          />
                        }
                      />
                      <Route
                        path={navRoutes.GENERAL.HOME}
                        exact
                        element={
                          <CustomRoute
                            Component={Pages.Home}
                            layout="general"
                          />
                        }
                      />

                      <Route
                        path={navRoutes.GENERAL.HOME_ORG}
                        exact
                        element={
                          <CustomRoute
                            Component={Pages.Home}
                            layout="general"
                          />
                        }
                      />

                      <Route
                        path={navRoutes.GENERAL.STEP_ORG}
                        exact
                        element={
                          <CustomRoute Component={Pages.Step} layout="step" />
                        }
                      />
                    </Route>
                  </Route>
                </Routes>
              </StepsProvider>
            </Router>
          </AuthProvider>
        </AccessibilityProvider>
        <CookieBot domainGroupId={domainGroupId} />
      </ThemeProvider>
    </div>
  );
}

export default App;
