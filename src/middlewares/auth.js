export const auth = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send("Token Invalid");
  }
};
