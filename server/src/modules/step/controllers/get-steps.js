import * as steps from '../use-cases';

const getSteps = async (req, res, next) => {
  try {
    const { lng = 'en' } = req.query;
    const landingPageContent = await steps.getSteps({ lng });

    res.json(landingPageContent);
  } catch (error) {
    next(error);
  }
};

export default getSteps;
