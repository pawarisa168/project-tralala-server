// export const validate = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.body, { abortEarly: false });
//     next();
//   } catch (error) {
//     const errText = error.errors.join(",");
//     const errorText = new Error(errText);
//     next(errorText);
//   }
// };
