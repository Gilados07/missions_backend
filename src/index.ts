import express from "express";
import cors from "cors";
import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/user";
import { missionRouter } from "./routers/mission";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/mission", missionRouter);
app.use("/api/organization", organizationRouter);

app.listen(+port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
