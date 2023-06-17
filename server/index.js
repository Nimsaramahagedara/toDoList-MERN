const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const routes = require('./routes/todoRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MONGODB CONNECTED !!  ');
}).catch(err=>console.log(err))

app.use('/', routes);

//Add Port and Connect to Server
app.listen(PORT , ()=>{console.log('SERVER CONNECTED ON ' + PORT)});
