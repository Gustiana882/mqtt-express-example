var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');
var { sequelize } = require("./database")
const db = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/", function(req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});

app.get("/", async function(req, res) {
  try {
    const result = await db.getAll();
    console.log(JSON.stringify(result))
    res.send(result)
  } catch (error) {
    console.log(error)
  }
  // res.status(200).send(mqttClient.message)
})

async function run() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(3000, function () {
      console.log("app running on port.", 3000);
    });
  } catch (error) {
    console.log(error)
  }
}

run()