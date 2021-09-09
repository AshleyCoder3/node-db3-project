const Scheme = require('./scheme-model');

const checkSchemeId = async (req, res, next) => {
  try {
    const schemeId = await Scheme.findById(req.params.scheme_id);
    if (schemeId) {
      req.scheme_id = schemeId;
      next();
    }
  } catch (err) {
    next({
      message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      status: 404
    });
  }
}; /// ONLY THING IT WORKS WHYYYYYYYY

const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body;
    if (!scheme_name || typeof scheme_name != 'string') {
      next({
        message: 'invalid scheme_name',
        status: 400
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;
    if (!instructions || typeof instructions !== 'string') {
      next({
        message: 'invalid step',
        status: 400
      });
    }
    if (typeof step_number !== 'number' || step_number < 1) {
      next({
        message: 'invalid step',
        status: 400
      });
    }
    else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
