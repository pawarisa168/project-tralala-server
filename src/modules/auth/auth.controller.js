export const register = (req, res, next) => {
  try {
    /* create a new user in the database
1. check Body
2. Check Email in Database
3. Encrypt Password = bcryptjs
4. Insert into DB
5. Response
*/
    console.log(req.body);
    res.json({ name: "in controller" });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res) => {
  res.json({ name: "beak login" });
};
