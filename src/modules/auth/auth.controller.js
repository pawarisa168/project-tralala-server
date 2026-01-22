import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";

// register user for 2 role (createUser to DB)
export const register = async (req, res, next) => {
  /* create a new user in the database
1. check Body
2. Check Email in Database
3. Encrypt Password = bcryptjs
4. Insert into DB
5. Response
*/
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered successfully" });
    console.log(newUser);
  } catch (error) {
    next(error);
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // กรอกข้อมูลให้ครบ
    if (!email || !password) {
      return res.status(400).json({
        message: "กรุณากรอกอีเมลและรหัสผ่าน",
      });
    }

    // check email
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).send({ message: "Password is Incorrect!!" });
      }
      // เอาไว้เก็บช้อมูลไปส่งหน้าบ้าน
      const payload = {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };

      //generate token
      const token = jwt.sign(
        { user: { id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      // response ส่งหน้าบ้าน
      res.status(200).json({
        token,
        user: payload.user,
      });
      console.log(payload);
      console.log({ message: token });
    } else {
      return res.status(400).send("email not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// // login user

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // กรอกข้อมูลให้ครบ
//     if (!email || !password) {
//       return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่าน" });
//     }
//     // check User from email
//     const user = await User.findOneAndUpdate({ email }, { new: true });
//     console.log(user);
//     if (user) {
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);
//       if (!isPasswordCorrect) {
//         return res.status(400).send({ message: "Password is Incorrect!!" });
//       }
//       // เอาไว้เก็บช้อมูลไปส่งหน้าบ้าน
//       const payload = { user: { id: user._id, role: user.role } };
//       console.log(payload);
//       //generate token
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" },
//         (error, token) => {
//           if (error) throw error;
//           res.json({ token, payload });
//         },
//       );
//     } else {
//       return res.status(400).send("email not found");
//     }
//   } catch (error) {}
// };
