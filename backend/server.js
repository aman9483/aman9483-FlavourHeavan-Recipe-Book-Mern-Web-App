const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser'); 

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{

      res.send('ok from backend side');
})

mongoose.connect(process.env.Mongo_url)
    .then(() => console.log('Database Connected:', process.env.Mongo_url))
    .catch(error => console.error('Database Connection Error:', error));

app.listen(PORT);

//routing

const userRoute = require('../Router/User');
const recipeRoute = require('../Router/Recipe')

app.use('/api/v1', userRoute);
app.use('/api/v1', recipeRoute);