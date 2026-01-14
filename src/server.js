import { app } from "./app.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;


try {
  await connectDB();
  app.listen(port, () => {
    console.log(`server runing on port: ${port}🟩`);
  });
} catch (error) {
  console.error(`Server is down ❌`, error);
  process.exit(1);
}
