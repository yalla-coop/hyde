import * as Steps from '../model';
import translateSteps from '../../../services/translation/translate-steps';
import * as Translation from '../../translations/model';

const getStep = async ({ slug, lng, forPublic }) => {
  const step = await Steps.getStepBySlug(slug, lng);
  if (!forPublic) {
    return step;
  }

  const [stepT] = await translateSteps({
    lng,
    steps: [step],
  });

  if (!stepT.isTranslated || !step.allFieldsTranslated) {
    Translation.createStepI18n({
      stepId: stepT.id,
      ...stepT,
      allFieldsTranslated: true,
    });
  }

  return {
    ...stepT,
    id: step.id,
    thingsYouWillNeed:
      stepT &&
      stepT.thingsYouWillNeed &&
      stepT.thingsYouWillNeed.map((item) => ({
        ...item,
        stage: 'thingsYouWillNeed',
      })),
    whatYouWillNeedToKnow:
      stepT &&
      stepT.whatYouWillNeedToKnow &&
      stepT.whatYouWillNeedToKnow.map((item) => ({
        ...item,
        stage: 'whatYouWillNeedToKnow',
      })),
  };
};

export default getStep;
