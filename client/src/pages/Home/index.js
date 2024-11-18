import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { Typography as T } from '../../components';
import HelpButton from '../../components/HelpButton';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Step from '../../components/Steps';
import TextWithIcon from '../../components/TextWithIcon';
import { common, navRoutes as n } from '../../constants';
import { useSteps } from '../../context/steps';
import { useLanguage } from '../../helpers';
import { stageTypes } from './../../constants/data-types';
import { usePublicOrg } from './../../context/public-org';
import LandingContent from './LandingContent';
import * as S from './style';

const Home = () => {
  const { t } = useTranslation();
  const { lng, dir } = useLanguage();
  const { publicOrg } = usePublicOrg();
  const { uniqueSlug } = publicOrg;
  const { steps, justCompletedId, setJustCompletedId, loadingSteps } =
    useSteps();

  const [showAfterClaim, setShowAfterClaim] = useState(false);

  const currentStep = steps.find(
    (step) => !step.isCompleted && step.stage !== stageTypes.BEFORE_CLAIMING
  );
  const currentStepRef = useRef();

  const completedClaim = currentStep?.stage === stageTypes.AFTER_CLAIMING;

  const getStepStatus = (step, i) => {
    const isCurrentStep = currentStep && step.id === currentStep.id;
    const variant = step.isCompleted
      ? 'neutral'
      : isCurrentStep
      ? 'primary'
      : 'secondary';
    const isJustCompletedOne = step.id === justCompletedId;
    // To only add ref to the currentStep
    let currentRef = isCurrentStep ? currentStepRef : null;
    if (i === steps.length - 1 && step.isCompleted) {
      currentRef = currentStepRef;
    }

    return { variant, currentRef, isJustCompletedOne, isCurrentStep };
  };

  const decideRoute = (step) =>
    generatePath(n.GENERAL.STEP_ORG, {
      uniqueSlug: publicOrg?.uniqueSlug,
      slug: step.slug,
    });

  useEffect(() => {
    if (currentStepRef.current && justCompletedId) {
      currentStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Completed step',
        action: currentStep?.title,
      });

      if (completedClaim) {
        ReactGA.event({
          category: 'Completed claim',
          action: 'Completed claim',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justCompletedId]);

  const _stepsObj = t('stepsObj', {
    ns: 'stepsObj',
    returnObjects: true,
  });

  const completed = t(
    'common.section.afterClaimContent.title.completed',
    common.section.afterClaimContent.title.completed
  );

  const notCompleted = t(
    'common.section.afterClaimContent.title.notCompleted',
    common.section.afterClaimContent.title.notCompleted
  );

  const completedText = t(
    'common.section.afterClaimContent.title.completed',
    common.section.afterClaimContent.title.completed
  );

  const notCompletedText = t(
    'common.section.afterClaimContent.text.notCompleted',
    common.section.afterClaimContent.text.notCompleted
  );

  return (
    <>
      <Helmet>
        <title>{`Universal Credit Support: Home`}</title>
        <meta
          name="description"
          content={`Are you trying to work out how you actually claim for Universal Credit and feeling a bit lost? Don't worry, we've got you!`}
        />
        <meta name="keywords" content={'Universal Credit Support'} />
      </Helmet>
      <LandingContent uniqueSlug={uniqueSlug} />

      {/* BEFORE CLAIMING */}
      {_stepsObj.BEFORE_CLAIMING?.map((step, i) => {
        const { variant, currentRef, isJustCompletedOne } = getStepStatus(
          step,
          i
        );

        return (
          <Step
            key={step.id}
            title={step.title}
            description={step.description}
            content={t(`${step.name}.subtitle`, lng)}
            isCompleted={step.isCompleted}
            variant={variant}
            direction={i % 2 === 0 ? 'left' : 'right'}
            mt="7"
            isJustCompletedOne={isJustCompletedOne}
            to={decideRoute(step)}
            ref={currentRef}
            isOptional={step.isOptional}
            handleClick={() => {
              setJustCompletedId('');
            }}
            loadingSteps={loadingSteps}
          />
        );
      })}

      {/* CLAIMING */}
      {_stepsObj.CLAIMING?.map((step, i) => {
        const { variant, currentRef, isJustCompletedOne } = getStepStatus(
          step,
          i
        );

        return (
          <Step
            key={step.id}
            title={step.title}
            description={step.description}
            content={t(`${step.name}.subtitle`, lng)}
            isCompleted={step.isCompleted}
            variant={variant}
            direction={i % 2 === (dir === 'ltr' ? 0 : 1) ? 'left' : 'right'}
            mt="7"
            isJustCompletedOne={isJustCompletedOne}
            to={decideRoute(step)}
            ref={currentRef}
            isOptional={step.isOptional}
            handleClick={() => {
              setJustCompletedId('');
            }}
            loadingSteps={loadingSteps}
          />
        );
      })}

      {/* AFTER CLAIMING */}
      <S.Section mt="7">
        <Icon icon="flag" color="primaryMain" mt="6" mb="5" mbM="0" mtM="5" />
        <T.H2 color="neutralMain" mb="1">
          {completedClaim ? completed : notCompleted}
        </T.H2>
        <S.StyledText>
          {completedClaim ? completedText : notCompletedText}
        </S.StyledText>
        {!completedClaim && !showAfterClaim && (
          <S.Container mt="4">
            <TextWithIcon
              isButton
              handleClick={() => setShowAfterClaim(true)}
              text={t('common.buttons.viewSteps', common.buttons.viewSteps)}
              jc="flex-start"
              weight="500"
              iconProps={{
                icon: 'bulletArrow',
                color: 'primaryMain',
              }}
            />
          </S.Container>
        )}
      </S.Section>

      {(completedClaim || showAfterClaim) &&
        _stepsObj.AFTER_CLAIMING?.map((step, i) => {
          const { variant, currentRef, isJustCompletedOne } = getStepStatus(
            step,
            i
          );

          return (
            <Step
              key={step.id}
              title={step.title}
              description={step.description}
              content={t(`${step.name}.subtitle`, lng)}
              isCompleted={step.isCompleted}
              variant={variant}
              direction={i % 2 === 0 ? 'left' : 'right'}
              mt="7"
              isJustCompletedOne={isJustCompletedOne}
              to={decideRoute(step)}
              ref={currentRef}
              isOptional={step.isOptional}
              handleClick={() => {
                setJustCompletedId('');
              }}
              loadingSteps={loadingSteps}
            />
          );
        })}
      <HelpButton />
      <S.Section>
        <Image
          image="mayorOfLondon"
          width={'300px'}
          customStyle={{ paddingTop: '40px', alignItems: 'center' }}
        />
      </S.Section>
    </>
  );
};

export default Home;
