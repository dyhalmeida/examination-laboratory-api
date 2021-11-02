const Yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      laboratoriesID: Yup.array(Yup.number().required()).required('laboratoriesID array of laboratoryID is required'),
    });

    await schemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};
