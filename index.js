const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const addBizCard = require('./routes/addBizCard');
const getBizCard = require('./routes/getBizCard');
const pageNotFound = require('./routes/pageNotFound');
const updateBizCard = require('./routes/updateBizCard');
const deleteBizCard = require('./routes/deleteBizCard.js');
const getUserBizCard = require('./routes/getUserBizCard');
const getAllCards = require('./routes/getAllCard');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()) // to handle JSON
app.use(express.urlencoded({extended:true})) // to handle form
app.use(express.static('public')) // to handle static files like CSS or Img
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/addBizCard',addBizCard)
app.use('/api/getBizCard',getBizCard)
app.use('/api/updateBizCard',updateBizCard)
app.use('/api/deleteBizCard',deleteBizCard)
app.use('/api/getUserBizCard',getUserBizCard)
app.use('/api/getAllCards',getAllCards)
app.use('*',pageNotFound)


 mongoose.connect("mongodb://localhost:27017/biz-site-backend").then(() => console.log("Connected to MongoDB")).catch((err) => console.log(`couldn't Connect to MongoDB : ${err}`));





app.listen(PORT, () => console.log(`http://localhost:${PORT}`));