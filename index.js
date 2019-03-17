import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

// require user router
import userRoutes from "./server/routes/user.routes";
// instantiate express application
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(
    `Hey human, CORS-enabled server is now running at port ${port} 😏`
  );
});
