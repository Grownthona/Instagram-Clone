const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");


app.use(express.json());
app.use(express.static('uploads'));
app.use(cors({
    origin:"http://localhost:3000",
  }))


const fileRouter = require('./routes/uploads');

app.use('/api/',fileRouter);

mongoose
  .connect(
    'mongodb+srv://mongr:yw46DNwYWt4@cluster0.htcqlu9.mongodb.net/image?retryWrites=true&w=majority'
  )
  .then(result => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.log(err);
  });


  app.listen(5000,()=>{console.log("Server started on port 5000")})
  