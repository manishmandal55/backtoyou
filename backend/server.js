var express = require('express')
const app = express()
// var bodyParser = require('body-parser')
// const morgan =require('morgan')
require("dotenv").config();
const cors =require('cors')
const port = process.env.PORT || 5000;
const cookie_parser=require("cookie-parser")
const mongoose =require('mongoose')
const routes = require('./routes/auth')
const category = require('./routes/category')
const passport = require('passport');
var path = require('path');
app.enable("trust proxy")

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookie_parser())

app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})

mongoose.connection.on('connected',()=>{
    console.log('Database connected')
})

app.use('/',routes)
app.use('/',category)

if(process.env.NODE_ENV='production'){
    app.use(express.static('Frontend/build'))
}

app.listen(port,()=> console.log(`Listening to port ${port}`))
