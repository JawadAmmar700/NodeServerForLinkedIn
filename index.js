const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
// const Pusher = require("pusher");
const User = require("./model/Schema")

app.use(cors({ origin: true }))
app.use(express.json())

mongoose.connect(
  "mongodb+srv://live:live123@cluster0.m3a5n.mongodb.net/LiveUser?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected")
)

app.get("/", (req, res) => {
  User.find((err, doc) => {
    res.json(doc)
  })
})

app.post("/", (req, res) => {
  const { name, des, src, video, email, photo, time } = req.body
  const user = new User({
    name,
    des,
    src,
    video,
    email,
    photo,
    time,
  })

  user
    .save()
    .then(() => {
      console.log("user created")
      User.find((err, doc) => {
        res.json(doc)
      })
    })
    .catch(err => console.log(err))
})

app.listen(5000, () => console.log("live 5000"))
