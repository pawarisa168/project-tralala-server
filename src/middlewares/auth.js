import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(401).send("No Token!!!");
    }
    const token = authHeader.split(" ")[1];

    // verify token
    // decoded = payload
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // แนบ identity ให้ request สร้างตัวแปรมาเก็บ
    req.user = decode.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// export const auth = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"];
//     console.log(token);
//     if (!token) {
//       return res.status(401).send("No Token!!!");
//     }
//     // verify token decoded = payload ที่ sign ไว้ตอน login
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     // แนบ identity ให้ request สร้างตัวแปรมาเก็บ
//     req.user = decode.user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
