import e from "express";
import { PORT } from "./config/env.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDB from "./db/mongoosedb.js";

const app = e();

app.use(e.json());

app.use("/api", userRouter());
app.use("/api", authRouter());

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  await connectToDB();
});
