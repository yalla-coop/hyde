import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Typography as T } from '../../components';
import { LandingPage } from '../../api-calls';
import { useLanguage } from '../../helpers';
import { usePublicOrg } from '../../context/public-org';
import Logo from '../../components/assets/Logo.png';
import { navRoutes } from '../../constants';

import * as S from './style';

const formatText = (text) => {
  if (!text) return '';
  const arr = text.split(/\. |! |\? /gm);
  const firstSentence = arr[0];
  if (!arr[1]) return <T.H2 color="primaryMain">{firstSentence}</T.H2>;

  const remainder = arr.slice(1).join(' ');
  return (
    <>
      <T.H2 color="primaryMain" mb="2" mr="2" mt="2">
        {firstSentence}! <S.Span>{remainder}</S.Span>
      </T.H2>
    </>
  );
};

const LandingContent = ({ uniqueSlug }) => {
  const { t } = useTranslation();
  const { lng } = useLanguage();

  const { publicOrg } = usePublicOrg();
  const logo = publicOrg?.logoUrl || Logo;

  const [landingContent, setLandingContent] = useState({});
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const hideMessage = message.loading('Loading...', 0);
      const { data, error } = await LandingPage.getLandingPageContent({
        lng,
        forPublic: true,
      });
      if (mounted) {
        if (error) {
          setFetchError(t(`generalError`, lng));
        } else {
          setLandingContent(data);
        }
        hideMessage();
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, t]);

  return (
    <>
      <S.PageHead
        showBGImage={!uniqueSlug || (publicOrg && Number(publicOrg?.id) === 1)}
      >
        <S.HeaderContent>
          <S.LogoContainer
            to={navRoutes.GENERAL.HOME_ORG.replace(
              ':uniqueSlug',
              publicOrg.uniqueSlug
            )}
          >
            {logo && <img src={logo} alt="hyde-logo" />}
          </S.LogoContainer>
          <S.HeaderText>
            {fetchError ? (
              <T.P color="error">{fetchError}</T.P>
            ) : (
              <T.H2 weight="bold" color="white">
                {landingContent.headline}
              </T.H2>
            )}
          </S.HeaderText>
        </S.HeaderContent>
      </S.PageHead>
      <S.Section>
        {formatText(landingContent.subtitle)}{' '}
        <S.StyledText mb="3">{landingContent.instructions}</S.StyledText>
      </S.Section>
    </>
  );
};

export default LandingContent;
