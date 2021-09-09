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
  /*
    If `instructions` is missing, empty string or not a string, or
    if `step_number` is not a number or is smaller than one:
  
    status 400
    {
      "message": "invalid step"
    }
  */

};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
