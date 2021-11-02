const Yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      examsID: Yup.array(Yup.number().required()).required('examsID array of examID is required'),
    });

    await schemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};
