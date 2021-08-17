import { useEffect, useRef } from 'react';

import Card from '../../components/Cards';
import { Typography as T, Inputs as I } from '../../components';
import { t } from '../../helpers';
import { useLang } from '../../context/lang';
import { useSteps } from '../../context/steps';
import { navRoutes as n } from '../../constants';

import * as S from './style';

const Home = () => {
  const { lang, langOptions, setLang } = useLang();
  const { steps, justCompletedId, setJustCompletedId } = useSteps();
  const currentStep = steps.find((step) => !step.isCompleted);
  const currentStepRef = useRef();

  useEffect(() => {
    if (currentStepRef.current && justCompletedId) {
      currentStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [justCompletedId]);

  return (
    <>
      <S.PageHead>
        <S.HeadContainer>
          {' '}
          <T.H1 weight="bold">{t('universalCreditOverview', lang)}</T.H1>
          <T.P weight="bold" isSmall mt="6" mb="2">
            {t('selectYourLanguage', lang)}
          </T.P>
          <S.DropdownContainer>
            <I.Dropdown
              options={langOptions}
              selected={lang}
              handleChange={setLang}
            />
          </S.DropdownContainer>
          <T.P mt="6" mb="6" mbT="4" mbM="2">
            {t('overviewText', lang)}
          </T.P>
        </S.HeadContainer>
      </S.PageHead>
      {steps.map((step, i) => {
        const isCurrentStep = currentStep && step.name === currentStep.name;
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
        return (
          <Card
            key={step.id}
            title={t(`${step.name}.title`, lang)}
            content={t(`${step.name}.subtitle`, lang)}
            isCompleted={step.isCompleted}
            variant={variant}
            direction={i % 2 === 0 ? 'left' : 'right'}
            mt="7"
            isJustCompletedOne={isJustCompletedOne}
            to={n.STEPS.STEP.replace(':id', step.id)}
            ref={currentRef}
            handleClick={() => {
              setJustCompletedId('');
            }}
          />
        );
      })}
    </>
  );
};

export default Home;
