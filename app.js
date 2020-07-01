var express = require('express')
var app = express()
require('dotenv').config()
var path = require('path')
require('ejs')
var apiRouter = require('./routes/Router')
const mongoose = require('mongoose');

mongoose.Promise=global.Promise
var flash = require('express-flacsh-message')
// var passport = require('express-session')
var session = require('express-session')


var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0-tecvg.mongodb.net/mydb_daejeon?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true} )


app.set('views',path.resolve(__dirname + '/view'))
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
const passport = require('passport')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret:"그러하다"  ,
    resave:true,
    saveUninitialized:true
}))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser((user)=>{
    User.findById(userId, (err, user)=>{
        done(err,user)
    })
})


// app.get('/',(req, res)=>{
//     res.render('test')
// })  
var localStrategy = require("passport-local")
var local = new localStrategy((username, password, done)=>{
    User.findOne({username})
    .then(user=>{
        if(!user ||user.validPassword(password)){
            done(null, false, {message:"Invalid username /password"})
        } else {
            done(null, user)
        }
    })
    .catch(e=>done(e))
});

passport.use("local",local)



app.use('/',apiRouter(passport)){
    router.use((req, res, next)=>{
        res.locals.currentUser = req.user
        console.log(res.locals.currentUser)
        next()
    })

}

const port = process.env.PORT

app.listen(port, function(){
    console.log(`Server is Starting at http://localhost:${port}`)
})