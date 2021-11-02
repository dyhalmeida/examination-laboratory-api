const Yup = require('yup');

module.exports = async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      name: Yup.string().required('name is required'),
      type: Yup.string().required('type is required'),
      status: Yup.boolean().required('status is required'),
      deleted: Yup.string().default(''),
    });

    await schemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};
