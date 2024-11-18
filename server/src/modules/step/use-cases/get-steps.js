import * as Steps from '../model';
import translateSteps from '../../../services/translation/translate-steps';
import * as Translation from '../../translations/model';

const getSteps = async ({ lng }) => {
  const steps = await Steps.getSteps(lng);

  const stepsT = await translateSteps({
    lng,
    steps: steps.map(
      ({ thingsYouWillNeed, whatYouWillNeedToKnow, ...step }) => ({
        ...step,
        // ignore thingsYouWillNeed and whatYouWillNeedToKnow, as they should not be translated
      }),
    ),
  });

  stepsT.forEach((c) => {
    if (!c.isTranslated) {
      Translation.createStepI18n({
        stepId: c.id,
        title: c.title,
        description: c.description,
        languageCode: c.languageCode,
        allFieldsTranslated: false,
      });
    }
  });

  const stepsTWithChecklist = stepsT.map((step) => {
    const originalStep = steps.find((s) => s.id === step.id);
    return {
      ...step,
      id: step.id,
      thingsYouWillNeed: originalStep.thingsYouWillNeed.map((item) => ({
        ...item,
        stage: 'thingsYouWillNeed',
      })),
      whatYouWillNeedToKnow: originalStep.whatYouWillNeedToKnow.map((item) => ({
        ...item,
        stage: 'whatYouWillNeedToKnow',
      })),
    };
  });

  return stepsTWithChecklist;
};

export default getSteps;
