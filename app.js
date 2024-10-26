var express = require('express');
var app = express();
const mongoose = require("mongoose")
const AllRoute = require("./src/routes/allroute")

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger");

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.get('/', function (req, res) {
  res.send('<h1 style="color:blue;">Hello World!</h1>');
});

app.use(express.json())
app.use("/api/", AllRoute)

const url = "mongodb://localhost:27017/flowersMarket"

const port = 3001
mongoose.connect(url)
app.listen(port, function () {
  console.log(`Example app listening on port ${port} on http://localhost:${port}`);
});