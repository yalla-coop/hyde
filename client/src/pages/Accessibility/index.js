import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Cards as C,
  Grid,
  Inputs as I,
  Typography as T,
} from '../../components';
import GeneralPaddingSection from '../../components/Layout/GeneralPaddingSection';
import { common, navRoutes as R } from '../../constants';
import { useAccessibility } from '../../context/accessibility';
import OverlayColor from './OverlayColor';
import * as S from './style';

const { Col, Row } = Grid;

const fontsOptions = [
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Heebo', label: 'Heebo' },
  { value: 'Comic Neue', label: 'Comic Neue' },
  { value: '', label: 'default' },
];

const Accessibility = () => {
  const { t } = useTranslation();
  const { isFontLarge, setIsFontLarge, layoutFontFamily, setLayoutFontFamily } =
    useAccessibility();

  const handleSelect = (value) => {
    localStorage.setItem('layoutFontFamily', value);
    setLayoutFontFamily(value);
  };

  const increaseTextSize = t(
    'common.buttons.increaseTextSize',
    common.buttons.increaseTextSize
  );
  const decreaseTextSize = t(
    'common.buttons.decreaseTextSize',
    common.buttons.decreaseTextSize
  );

  return (
    <>
      <Helmet>
        <title>{`Universal Credit Support: Accessibility`}</title>
        <meta
          name="description"
          content={`Accessibility on this website is guided by government standards and the Web Content Accessibility Guidelines WCAG are widely accepted as the international standard for accessibility on the web.`}
        />
        <meta
          name="keywords"
          content={'Universal Credit Support Accessibility'}
        />
      </Helmet>
      <GeneralPaddingSection>
        <Row jc="space-between">
          <Col w={[4, 12, 8]} dir="column" ai="flex-start">
            <T.H1 mtM="2">
              {t(
                'common.section.accessibility.title',
                common.section.accessibility.title
              )}
            </T.H1>
            <T.P mt="5">
              {t(
                'common.section.accessibility.description1',
                common.section.accessibility.description1
              )}
            </T.P>
            <T.P mt="5" mtM="0">
              {t(
                'common.section.accessibility.description2',
                common.section.accessibility.description2
              )}
            </T.P>
            <S.Wrapper>
              <C.Tips
                mt="5"
                mtT="4"
                style={{ maxWidth: '300px', width: '100%' }}
                tips={[
                  <T.P color="white">
                    {t(
                      'common.section.accessibility.tip1',
                      common.section.accessibility.tip1
                    )}{' '}
                    <T.Link
                      to={`mailto:${R.EXTERNAL.COL_EMAIL}`}
                      color="white"
                      external
                      underline
                      weight="semi"
                    >
                      {t(
                        'common.section.accessibility.contactUs',
                        common.section.accessibility.contactUs
                      )}
                    </T.Link>{' '}
                    .
                  </T.P>,
                ]}
                startingColor={0}
                mb="0"
              />
              <C.Tips
                mt="5"
                mtT="0"
                style={{ maxWidth: '300px', width: '100%' }}
                tips={[
                  <T.P color="secondaryMain">
                    {t(
                      'common.section.accessibility.tip2',
                      common.section.accessibility.tip2
                    )}{' '}
                    <T.Link
                      to={`mailto:${R.EXTERNAL.APPLE_ACCESSIBILITY}`}
                      color="secondaryMain"
                      external
                      underline
                      weight="semi"
                    >
                      {t(
                        'common.section.accessibility.appleAccessibility',
                        common.section.accessibility.appleAccessibility
                      )}{' '}
                    </T.Link>{' '}
                    {t('common.words.and', common.words.and)}{' '}
                    <T.Link
                      to={`mailto:${R.EXTERNAL.ANDROID_ACCESSIBILITY}`}
                      color="secondaryMain"
                      external
                      underline
                      weight="semi"
                    >
                      {t(
                        'common.section.accessibility.androidAccessibility',
                        common.section.accessibility.androidAccessibility
                      )}{' '}
                    </T.Link>{' '}
                    .
                  </T.P>,
                ]}
                startingColor={1}
                mb="0"
              />
            </S.Wrapper>
          </Col>

          <S.HideInDesktop>
            <Col w={[4, 12, 12]}>
              <S.Divider />
            </Col>
          </S.HideInDesktop>

          <Col w={[4, 8, 4]}>
            <OverlayColor />
          </Col>

          <S.HideInDesktop>
            <Col w={[4, 12, 12]}>
              <S.Divider />
            </Col>
          </S.HideInDesktop>
        </Row>
        <Row jc="space-between">
          <Col w={[4, 8, 7]}>
            <T.H2 mt="8" mtM="6">
              {t(
                'common.section.accessibility.adjustTextSize',
                common.section.accessibility.adjustTextSize
              )}
            </T.H2>
            <S.Wrapper>
              <Button
                handleClick={() => {
                  if (!isFontLarge) {
                    document.getElementsByTagName('html')[0].style.fontSize =
                      '1.25rem';
                    localStorage.setItem('isFontLarge', 'true');
                    setIsFontLarge(true);
                  } else {
                    document.getElementsByTagName('html')[0].style.fontSize =
                      '1rem';
                    localStorage.removeItem('isFontLarge');
                    setIsFontLarge(false);
                  }
                }}
                variant="primary"
                disabled={false}
                text={isFontLarge ? decreaseTextSize : increaseTextSize}
                type="submit"
                mt={4}
              />
              <C.Tips
                mlM="0"
                mt="4"
                mtT="0"
                style={{ width: '100%' }}
                tips={[
                  <T.P color="neutralMain" weight="semi">
                    {t(
                      'common.section.accessibility.tip2',
                      common.section.accessibility.tip2
                    )}
                  </T.P>,
                ]}
                startingColor={3}
                mb="0"
              />
            </S.Wrapper>
          </Col>
          <Col w={[4, 4, 4]} mt="8">
            <S.ShowInDesktop>
              <S.FontInputWrapper>
                <I.Dropdown
                  label={t(
                    'common.section.accessibility.changeFont',
                    common.section.accessibility.changeFont
                  )}
                  options={fontsOptions}
                  selected={layoutFontFamily}
                  handleChange={handleSelect}
                  allowClear={false}
                  customFont
                />
              </S.FontInputWrapper>
            </S.ShowInDesktop>
          </Col>
        </Row>
        <Row mt="4">
          <Col w={[4, 12, 8]}>
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.internetExplorerTitle',
                common.section.accessibility.internetExplorerTitle
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2" mb="4">
            <T.P color="neutralDark">
              {t(
                'common.section.accessibility.internetExplorerDescription',
                common.section.accessibility.internetExplorerDescription
              )}
            </T.P>
          </Col>

          <Col w={[4, 12, 8]}>
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.firefoxTitle',
                common.section.accessibility.firefoxTitle
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2">
            <T.P color="neutralDark">
              {t(
                'common.section.accessibility.firefoxDescription',
                common.section.accessibility.firefoxDescription
              )}
            </T.P>
          </Col>
          <S.HideInDesktop>
            <Col w={[4, 12, 12]}>
              <S.Divider />
            </Col>
            <Col w={[4, 8, 12]}>
              <S.FontInputWrapper>
                <I.Dropdown
                  label={t(
                    'common.section.accessibility.changeFont',
                    common.section.accessibility.changeFont
                  )}
                  options={fontsOptions}
                  selected={layoutFontFamily}
                  handleChange={(selectValue) =>
                    setLayoutFontFamily(selectValue)
                  }
                  allowClear={false}
                  customFont
                />
              </S.FontInputWrapper>
            </Col>
            <Col w={[4, 12, 12]}>
              <S.Divider />
            </Col>
          </S.HideInDesktop>
          <Col w={[4, 12, 8]} mt="8" mtT="0">
            <T.H2 color="black" weight="bold">
              {t(
                'common.section.accessibility.textToSpeechTitle',
                common.section.accessibility.textToSpeechTitle
              )}
            </T.H2>
          </Col>

          <Col w={[4, 12, 8]} mt="3">
            <T.P color="neutralDark">
              {t(
                'common.section.accessibility.textToSpeechDescription',
                common.section.accessibility.textToSpeechDescription
              )}
            </T.P>
          </Col>

          <Col w={[4, 12, 8]} mt="4">
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.chromeTitle',
                common.section.accessibility.chromeTitle
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2">
            <T.P color="neutralDark">
              <T.Link
                external
                underline
                color="neutralMain"
                to={R.EXTERNAL.CHROME_GOOGLE_SPEAK}
              >
                {t(
                  'common.section.accessibility.googleSpeak',
                  common.section.accessibility.googleSpeak
                )}
              </T.Link>{' '}
              {t(
                'common.section.accessibility.addSpeakButton',
                common.section.accessibility.addSpeakButton
              )}
            </T.P>
          </Col>

          <Col w={[4, 12, 8]} mt="4">
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.windowsEdgeTitle',
                common.section.accessibility.windowsEdgeTitle
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2">
            <T.P color="neutralDark">
              {t(
                'common.section.accessibility.windowsEdgeDescription',
                common.section.accessibility.windowsEdgeDescription
              )}
            </T.P>
          </Col>

          <Col w={[4, 12, 8]} mt="4">
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.androidApps',
                common.section.accessibility.androidApps
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2">
            <T.P color="neutralDark">
              <T.Link
                external
                underline
                color="neutralMain"
                to={R.EXTERNAL.VOICE_ALOUD_READER_ANDROID}
              >
                {t(
                  'common.section.accessibility.downloadReadAloud',
                  common.section.accessibility.downloadReadAloud
                )}
              </T.Link>{' '}
              {t(
                'common.section.accessibility.forAndroid',
                common.section.accessibility.forAndroid
              )}
            </T.P>
          </Col>

          <Col w={[4, 12, 8]} mt="4">
            <T.H3 color="neutralMain" weight="bold">
              {t(
                'common.section.accessibility.appleTitle',
                common.section.accessibility.appleTitle
              )}
            </T.H3>
          </Col>
          <Col w={[4, 12, 8]} mt="2">
            <T.P color="neutralDark">
              <T.Link
                external
                underline
                color="neutralMain"
                to={R.EXTERNAL.VOICE_ALOUD_READER_APPLE}
              >
                {t(
                  'common.section.accessibility.downloadVoiceAloud',
                  common.section.accessibility.downloadVoiceAloud
                )}
              </T.Link>{' '}
              {t(
                'common.section.accessibility.searchVoiceAloudReader',
                common.section.accessibility.searchVoiceAloudReader
              )}
            </T.P>
          </Col>
        </Row>
      </GeneralPaddingSection>
    </>
  );
};
export default Accessibility;
