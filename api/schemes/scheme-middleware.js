const Scheme = require('./scheme-model');

const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params;
  if (!scheme_id) {
    next({
      message: `scheme with scheme_id ${req.params.id} not found`,
      status: 404
    });
  } else {
    next();
  }
};

const validateScheme = (req, res, next) => {
  /*
    If `scheme_name` is missing, empty string or not a string:
  
    status 400
    {
      "message": "invalid scheme_name"
    }
  */

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
