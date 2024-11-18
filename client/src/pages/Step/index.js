import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { common } from '../../constants';
import B from '../../constants/benefit-calculator';

import * as Steps from '../../api-calls/steps';
import {
  Button,
  Cards,
  Grid,
  HelpButton,
  Icon,
  OrganisationLogo,
  Typography as T,
  TextWithIcon,
} from '../../components';
import { navRoutes as n, types } from '../../constants';
import { useSteps } from '../../context/steps';
import { useLanguage } from '../../helpers';
import * as S from './style';

import { usePublicOrg } from '../../context/public-org';

const { Row, Col } = Grid;
const { Tips, Checklist } = Cards;

const Step = () => {
  const [step, setStep] = useState([]);
  const [stuck, setStuck] = useState(false);
  const { publicOrg } = usePublicOrg();
  const params = useParams();
  const navigate = useNavigate();
  const { steps, checkUncheckItem, markAsComplete } = useSteps();
  const { t } = useTranslation();
  const { lng } = useLanguage();

  const stepFromStorage = steps.find((step) => step.id === Number(params.id));

  useEffect(() => {
    const getSteps = async () => {
      const hideMessage = message.loading('Loading...', 0);

      const { data, error } = await Steps.getStepBySlug({
        slug: params.slug,
        lng,
        forPublic: true,
      });

      hideMessage();
      if (error) {
        navigate(n.GENERAL.NOT_FOUND);
      }
      setStep(data);
    };
    getSteps();
  }, [lng, navigate, params.slug]);

  if (!step) {
    navigate(n.GENERAL.NOT_FOUND);
    return null;
  }

  const formatLink = (link, type) => {
    if (type === types.linkTypes.PHONE) {
      return `tel:${link}`;
    }
    return link;
  };

  const checkItem = (index, key) => {
    const foundItem = stepFromStorage?.[key]?.[index];
    return foundItem?.isChecked;
  };

  return (
    <>
      <Helmet>
        <title>{`Universal Credit Support: ${step?.title || ''}`}</title>
        <meta
          name="description"
          content={`universal credit support | ${step.description}`}
        />
        <meta name="keywords" content={step.title} />
      </Helmet>

      <S.Container>
        <S.PageHead>
          <S.CloseWrapper onClick={() => navigate(-1)}>
            <OrganisationLogo logoUrl={publicOrg.logoUrl} />
          </S.CloseWrapper>

          <S.CloseWrapper onClick={() => navigate(-1)} padding="10px">
            <Icon icon="close" width={16} height={16} pointer />
          </S.CloseWrapper>
        </S.PageHead>

        <S.InnerContainer>
          <Row mb="8" mt="8" mbM="6">
            <Col w={[4, 12, 6]}>
              <T.H1 weight="bold" mb="5">
                {step.pageTitle || step.title}
              </T.H1>
              <T.P color="neutralDark" mb="6" mbT="5">
                {step.pageDescription || step.description}
              </T.P>
            </Col>
            {step.topTip && (
              <Row inner>
                <Col w={[4, 12, 6]}>
                  <Tips tips={[step.topTip]} ml="5" mlT="0" />
                </Col>
              </Row>
            )}
          </Row>

          {step.howLongDoesItTake?.timeRangeText && (
            <Row>
              <Col w={[4, 12, 6]}>
                <S.SectionHeader mb="2">
                  <Icon
                    icon="time"
                    width={24}
                    height={24}
                    color="primaryMain"
                    mr="2"
                  />
                  <T.H2 color="neutralMain">
                    {t(
                      'common.heading.howLongDoesItTake.title',
                      common.heading.howLongDoesItTake.title
                    )}
                  </T.H2>
                </S.SectionHeader>
                <T.P color="neutralDark">
                  {step.howLongDoesItTake.timeRangeText}
                </T.P>
              </Col>
            </Row>
          )}

          <Row mt="8" mtM="7">
            <Col w={[4, 12, 12]}>
              <S.SectionHeader mb="5">
                <Icon
                  icon="time"
                  width={24}
                  height={24}
                  color="primaryMain"
                  mr="2"
                />
                <T.H2 color="neutralMain">
                  {t(
                    'common.heading.thingsYouWillNeed.title',
                    common.heading.thingsYouWillNeed.title
                  )}
                </T.H2>
              </S.SectionHeader>
              <Row inner>
                {step.thingsYouWillNeed?.length > 0 ? (
                  step.thingsYouWillNeed.map((item, index) => (
                    <Col w={[4, 12, 6]} key={index} isFirst={index === 0}>
                      <Checklist
                        completed={checkItem(index, 'thingsYouWillNeed')}
                        handleChange={() =>
                          checkUncheckItem(step.id, index, 'thingsYouWillNeed')
                        }
                        title={item.title}
                        description={item.description}
                        thisCanInclude={item.thisCanInclude}
                        tips={item.tips}
                        mb="4"
                      />
                    </Col>
                  ))
                ) : (
                  <Col w={[4, 12, 8]}>
                    <T.P color="neutralDark">
                      {t(
                        'common.heading.thingsYouWillNeed.text',
                        common.heading.thingsYouWillNeed.text
                      )}
                    </T.P>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>

          {step.whatYouWillNeedToKnow?.length > 0 && (
            <Row mt="8" mtM="7">
              <Col w={[4, 12, 12]} ai="flex-start">
                <S.SectionHeader mb="5">
                  <Icon
                    icon="checklist2"
                    width={24}
                    height={24}
                    color="primaryMain"
                    mr="2"
                  />
                  <T.H2 color="neutralMain">
                    {t(
                      'common.heading.whatYouWillNeedToKnow.title',
                      common.heading.whatYouWillNeedToKnow.title
                    )}
                  </T.H2>
                </S.SectionHeader>
                <Row inner>
                  {step.whatYouWillNeedToKnow.map((item, index) => (
                    <Col w={[4, 12, 6]} key={index}>
                      <Checklist
                        completed={checkItem(index, 'whatYouWillNeedToKnow')}
                        handleChange={() =>
                          checkUncheckItem(
                            step.id,
                            index,
                            'whatYouWillNeedToKnow'
                          )
                        }
                        title={item.title}
                        description={item.description}
                        thisCanInclude={item.thisCanInclude}
                        tips={item.tips}
                        mb="4"
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}

          {step.otherTips?.length > 0 && (
            <Row mt="3" mtM="1">
              <Tips tips={step.otherTips} startingColor={1} cols={[4, 12, 6]} />
            </Row>
          )}

          {step.id === 1 && (
            <>
              <Row mb="5" mt="8" mtM="7">
                <Col w={[4, 12, 6]} ai="flex-start">
                  <S.SectionHeader mb="5">
                    <Icon
                      icon="compass"
                      width={24}
                      height={24}
                      color="primaryMain"
                      mr="2"
                    />
                    <T.H2 color="neutralMain">
                      {t(
                        'common.heading.whereDoYouNeedToGo.title',
                        common.heading.whereDoYouNeedToGo.title
                      )}
                    </T.H2>
                  </S.SectionHeader>
                  <T.P color="neutralDark">
                    {t(
                      'common.heading.whereDoYouNeedToGo.text',
                      common.heading.whereDoYouNeedToGo.text
                    )}
                  </T.P>
                </Col>
              </Row>
              <Row>
                <Col w={[4, 12, 6]}>
                  <Button
                    variant="primary"
                    text={
                      publicOrg?.benefitCalculatorLabel ||
                      t(
                        'common.buttons.benefitCalculator',
                        common.buttons.benefitCalculator
                      ) ||
                      B.BENEFIT_CALCULATOR_LABEL
                    }
                    to={
                      publicOrg?.benefitCalculatorLink ||
                      B.BENEFIT_CALCULATOR_LINK
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    external
                  />
                </Col>
              </Row>
            </>
          )}
          {step.whereDoYouNeedToGo?.link && (
            <>
              <Row mb="5" mt="8" mtM="7">
                <Col w={[4, 12, 6]} ai="flex-start">
                  <S.SectionHeader mb="5">
                    <Icon
                      icon="compass"
                      width={24}
                      height={24}
                      color="primaryMain"
                      mr="2"
                    />
                    <T.H2 color="neutralMain">
                      {t(
                        'common.heading.whereDoYouNeedToGo.title',
                        common.heading.whereDoYouNeedToGo.title
                      )}
                    </T.H2>
                  </S.SectionHeader>
                  <T.P color="neutralDark">
                    {t(
                      'common.heading.whereDoYouNeedToGo.text',
                      common.heading.whereDoYouNeedToGo.text
                    )}
                  </T.P>
                </Col>
              </Row>
              <Row>
                <Col w={[4, 12, 6]}>
                  <Button
                    variant="primary"
                    text={step.whereDoYouNeedToGo.title}
                    to={formatLink(
                      step.whereDoYouNeedToGo.link,
                      step.whereDoYouNeedToGo.type
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir={
                      step.whereDoYouNeedToGo.type === 'PHONE' ? 'ltr' : null
                    }
                    external
                  />
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col w={[4, 12, 6]} mt="8" mtM="7" mb="5">
              <TextWithIcon
                text={t(
                  'common.buttons.stuckCallUs',
                  common.buttons.stuckCallUs
                )}
                isButton
                handleClick={() => setStuck(true)}
                underline
                weight="medium"
                mr="3"
                jc="center"
                iconProps={{
                  icon: 'phone',
                  color: 'primaryMain',
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 12, 6]} mt="6" mb="7">
              <Button
                variant="secondary"
                text={t(
                  'common.buttons.markAsComplete',
                  common.buttons.markAsComplete
                )}
                to={
                  publicOrg?.uniqueSlug
                    ? n.GENERAL.HOME_ORG.replace(
                        ':uniqueSlug',
                        publicOrg.uniqueSlug
                      )
                    : n.GENERAL.HOME
                }
                handleClick={() => {
                  markAsComplete(step.id);
                }}
              />
            </Col>
          </Row>
        </S.InnerContainer>
        <HelpButton parentState={stuck} parentFunc={() => setStuck(false)} />
      </S.Container>
    </>
  );
};

export default Step;
