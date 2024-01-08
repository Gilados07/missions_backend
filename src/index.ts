import express from "express";
import { organizationRouter } from "./routers/organization";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/organization", organizationRouter);

app.listen(+port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
