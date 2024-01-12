import express from "express";
import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/user";
import { missionRouter } from "./routers/mission";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/organization", organizationRouter);
app.use("/user", userRouter);
app.use("/mission", missionRouter);

app.listen(+port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
