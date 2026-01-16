import bcrypt from "bcryptjs";
import { User } from "../../models/auth.models.js";
/* create a new user in the database
1. check Body
2. Check Email in Database
3. Encrypt Password = bcryptjs
4. Insert into DB
5. Response
*/

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res) => {
  res.json({ name: "beak login" });
};
