require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/middleware");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const userRouter = require("./routes/userRouter");

const corsOptions = {
  origin: "*", // "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use("/api/users", userRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server up and running on PORT: ", process.env.PORT);
});
