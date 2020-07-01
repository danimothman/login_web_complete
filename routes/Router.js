var express = require('express');
var router = express.Router();
var User = require('../models/User');

// function test(req, nes, next){
//     if(req) {next()} else {
//         console.log("asdfsdfasdf")
//     }
// }
var name = {
    a: "김환국",
    b: "홍길동",
    c: "일지매"
}

router.get('/', function(req, res, next){
    User.find((err, result)=>{
        if(err){
            console.log(err)
        }
        // console.log(req)
        // res.send(result)
        res.render('index', {data:name})
    })
})
router.post('/insert', (req, res, next)=>{

    var contact =  new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send("Success")
    })

})

router.get('/signup',(req, res, next)=>{
    res.render('signup.ejs')
})

router.post('/signup', (req, res , next)=>{
    var contact = new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email
    contact.save((err, result)=>{
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("Success")
    })
})


// router.get('/login',(req, res, next)=>{
//     res.render('login')
// })

router.route('/login')
    .get((req, res, next) => {
        res.render('login.ejs')
    })
    .post(async (req, res, next) => {
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
                    res.render('index.ejs', {data:username})
                }
                else{
                    res.send(`${username}'s password is wrong`)
                }
            }
        })
    })
router.get('/main',(req, res, next)=>{
    res.render( 'main')
});
router.get('/insert',(req, res, next)=>{
    res.render( 'insert')
});

module.exports = router;