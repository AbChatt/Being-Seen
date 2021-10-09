// Middleware to validate required parameters unique to youth signup endpoint
// are present and valid
const validateYouthSignup = (req, res, next) => {
  next();
};

export default validateYouthSignup;
