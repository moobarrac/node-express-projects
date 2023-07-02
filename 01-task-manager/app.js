const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandleMiddleWare = require("./middleware/errorHandler");

//middleware
app.use(express.static("./public"));
app.use(express.json({}));

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandleMiddleWare);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
