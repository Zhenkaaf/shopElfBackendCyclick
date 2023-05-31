const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const pizzaRoute = require("./routes/pizzas");
const sushiRoute = require("./routes/sushi");
const donnyRoute = require("./routes/donny");
const orderRoute = require("./routes/order");

mongoose
  .connect(process.env.MONGO_URL, {})
  .then((res) => console.log("connected to db"))
  .catch((error) => console.log("errorDB"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-Width, content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const allowedOrigins = ["https://zhenkaaf.github.io/shopElfFrontendDeploy/"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, DELETE, PUT, OPTIONS",
    accessControlAllowHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.options("/neworder", (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = process.env.PORT || 8001;
app.use("/pizzas", pizzaRoute);
app.use("/sushi", sushiRoute);
app.use("/donny", donnyRoute);
app.post("/api/neworder", orderRoute);

app.listen(PORT, (error) => {
  error
    ? console.log("listen***", error)
    : console.log(`listening port ${PORT}`);
});

/* 

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/posts', getPosts);

app.get('/edit/:id', getEditPostPage);
app.put('/editpost/:id', editPost);

 */
