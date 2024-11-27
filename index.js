const express = require('express');
const mongoose = require('mongoose');
const bodyparser= require('body-parser');
const postRoutes= require('./routes/posts');




const app = express();
const PORT = 5000;



//middleware
app.use(bodyparser.json());

//connect to Mongodb
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=> console.log('Database connection error:', err));

//connecting routes
app.use('/api/posts', postRoutes);
//start a server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

});