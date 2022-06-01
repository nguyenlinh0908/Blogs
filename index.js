require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database/database");
const routerAuth = require("./routers/auth");
const routerBlogs = require("./routers/blogs")
// const routerBlogs = require("./routers/blogs");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/auth/", routerAuth);
app.use("/api/v1/blogs/", routerBlogs);
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  connectDB(process.env.DATABASE_URL);
  console.log(`server is running in ${PORT}`);
});
