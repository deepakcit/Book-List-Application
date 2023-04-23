const moongose = require("moongose");
const mongoose = require("moongose");
const app = require("./src/app");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', false);
moongose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connected to database..");
})

app.listen(PORT, ()=>{console.log("server is running on "+PORT);})