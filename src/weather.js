const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { default: axios } = require("axios");
const app = express();
const port = 3344;
const access_key = "0183c3d5f8302ba2ffbb3c22468c7176";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set(
  "views",
  path.join("C:/Users/gopiv/OneDrive/Documents/projects/weather", "./views")
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/webpage/weatherForm.html"));
});

app.post("/weather", async (req, res) => {
  let cityName = req.body.cityName;
  let data;
  let requiredData;
  try {
    data = await axios.get(
      "http://api.weatherstack.com/current?access_key=" +
        access_key +
        "&query=" +
        cityName
    );
    requiredData = data.data.current;
  } catch (err) {
    console.log("error", e);
  }
  res.render("weather", {
    title: "Online weather report",
    city: cityName,
    image: requiredData.weather_icons[0],
    pressure: requiredData.pressure,
    humidity: requiredData.humidity,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
