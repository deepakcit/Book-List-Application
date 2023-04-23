const moongose = require('mongoose');

const booksData= moongose.Schema({
username:{type:String,required:true},
title:{type:String,required:true},
author:{type:String,required:true},
discription:{type:String,default:"nice book"},
publishedDate:{type:String},
publisher:{type:String},
genre:{type:String}

})
const Bmodel = moongose.model("books",booksData);
module.exports= Bmodel;