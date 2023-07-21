const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Welcome to App");
});

app.post("/meditation",async(req, res) => {
    console.log(req.body,"req body payload")
  let payload = {
    usecase: "GPT_MEDITATION_CREATOR",
    userInput:
      `feeling ${req.body.feeling} right now, they currently are ${req.body.work} and facing ${req.body.issues} issues today`,
  };
  
  try{
      await axios.post("https://gpt-api.richexplorer.com/api/general", payload)
        .then((data) => {
          console.log(data.data)
          res.send(data.data);
        })
        .catch((err) => {
          console.log(err)
          res.send("Something went wrong");
        });
  }
  catch{
    res.send("Something went wrong")
  }
});

app.listen(process.env.port, async () => {
  try {
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});
