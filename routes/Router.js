var express = require('express');
var router = express.Router();
var User = require('../models/User');
const List = require('../models/List');
var bcrypt = require('bcryptjs')
var name = {
    a: "김환국",
    b: "홍길동",
    c: "일지매"
}

router.get('/', function(req, res , next){
    User.find((err, result)=>{
        if(err) {
            console.log(err)
        }
        // console.log(req)
        // res.send(result)
        res.render('index', {data:result})
    })
   
})
router.get('/signup', (req, res , next)=>{
    res.render('signup'), {message:"false"}
})


router.post('/signup', (req, res , next)=>{
    User.findOne({username :req.body.username} ,(err, user)=>{
        if(err) {
            console.log(err)
        } else if(user) {
            console.log(user)
            res.render('signup',  {message:"false" ,data:user.username})
        } 
        var contact = new User()
        contact.username = req.body.username
        contact.passwordHash =bcrypt.hashSync(req.body.passwordHash)
        contact.email = req.body.email
        contact.save((err, result)=>{
            if(err) {
                console.log(err)
            }
            console.log(result)
            res.redirect("/main")
    })
    })
})



router.get('/login',(req, res , next)=>{
    res.render('login')
})

router.post('/login',async (req, res, next) => {
    var username = await req.body.username
    var passwordHash = await req.body.passwordHash
    User.findOne({username:username} ,(err,result) =>{
        if(err){
            console.log(err.body)
        }
        if(!result){
            res.send(`${username} is not exist`)
        } else {
            if(result.passwordHash == passwordHash){
                console.log(username)
                res.render('index', {data:username})
            }
            else{
                res.send(`${username}'s password is wrong`)
            }
        }
    })
})

router.get('/main' ,(req, res , next)=>{
    List.find((err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internal is dekay!!")
        }

        console.log(result)
        res.render('main', {data:result})

    })
})




router.get('/insert',(req, res, next)=>{
    res.render( 'insert')
});


router.post('/insert' ,(req, res , next)=>{
    var contact = new List()
    contact.title = req.body.title
    contact.description = req.body.description
    contact.email = req.body.email
    contact.author = req.body.author
    contact.save((err, result)=>{
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.redirect("/main")
    })
}) 


module.exports = router;