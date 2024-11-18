import * as landingPage from '../use-cases';

const getLandingPage = async (req, res, next) => {
  try {
    const { lng = 'en', forPublic } = req.query;
    const _forPublic = forPublic === 'true';
    const landingPageContent = await landingPage.getLandingPage({
      lng,
      forPublic: _forPublic,
    });

    res.json(landingPageContent);
  } catch (error) {
    next(error);
  }
};

export default getLandingPage;
