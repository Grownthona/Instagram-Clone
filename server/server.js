const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
  }))

  app.listen(5000,()=>{console.log("Server started on port 5000")})
  