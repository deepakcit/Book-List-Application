const moongose = require("mongoose");

const newUser = moongose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
const Rmodel = moongose.model("users",newUser);
module.exports = Rmodel;