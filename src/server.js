import { app } from "./app.js";

const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    console.log(`server runing on port: ${port}🟩`);
  });
} catch (error) {
  console.error(`Server is down ❌`, error);
  process.exit(1);
}
