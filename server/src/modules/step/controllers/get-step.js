import * as steps from '../use-cases';

const getStep = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { lng = 'en', forPublic } = req.query;
    const step = await steps.getStep({
      slug,
      lng,
      forPublic: forPublic === 'true',
    });

    res.json(step);
  } catch (error) {
    next(error);
  }
};

export default getStep;
