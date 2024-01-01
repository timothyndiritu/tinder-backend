import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from './dbCards.js'

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://<username>:<password>@cluster0.ylmreet.mongodb.net/tinderdb?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(Cors())


//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

//Api Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Clever Programmers"));

app.post('/tinder/cards', async (req, res) => {
  const dbCard = req.body;
  
  try {
    const data = await Cards.create(dbCard)
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(err)
  }
  // Cards.create(dbCard, (err, data) => {
  //   if (err) {
  //     res.status(500).send(err)
  //   } else {
  //     res.status(201).send(data)
  //   }
  // })

});

app.get('/tinder/cards',async (req, res) => {
  try {
    const data = await Cards.find();
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
  // Cards.find((err, data) => {
  //   if (err) {
  //     res.status(500).send(err)
  //   } else {
  //     res.status(200).send(data)
  //   }
  // })

})

//Listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
