const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define path for express
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);
const app = express();
const port =process.env.port || 3000;
//Set express config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Define express static directory
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Praveen"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Praveen"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    message: "How can i help you?",
    name: "Praveen"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide address"
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
       return res.send({error})
      }
      console.log(latitude, longitude,forecastData)
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    });
  });

  // res.send({
  //   forecast: "It currently 36 degrees and there is no chance of rain",
  //   location: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search value"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Praveen",
    title: "404",
    errorMessage: "help doc not found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "Praveen",
    title: "404",
    errorMessage: "page not found"
  });
});
app.listen(port, () => {
  console.log("server is up");
});
