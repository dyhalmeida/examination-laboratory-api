const Yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      laboratories: Yup.array(Yup.object().shape({
        name: Yup.string().required('name is required'),
        address: Yup.string().required('address is required'),
      })).required('laboratories array of laboratory is required'),
    });

    await schemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};
