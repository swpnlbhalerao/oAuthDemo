const express=require('express');
const authroutes=require('./routes/auth-routes');
const profileroutes=require('./routes/profile-route');

const passportSetUp=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./keys');
const cookieSession=require('cookie-session');
const passport=require('passport');
const app=express();



app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.key]
}))


app.use(passport.initialize());
app.use(passport.session());


app.set('view engine','ejs')
app.use('/auth',authroutes);
app.use('/profile',profileroutes);

mongoose.connect(keys.mongoDb.dbUrl,
    { useNewUrlParser: true },(error)=>{
        if(!error)
        console.log("Connected Successfully");
        else
        console.log("Error message "+error.message);
    }); 



app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})

app.listen(5000,()=>console.log('running on port 5000'));