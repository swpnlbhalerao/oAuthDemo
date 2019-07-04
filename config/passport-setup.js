const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys');
const User = require('../models/user.model')



passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
});

passport.use(new GoogleStrategy({
    //option fro google login
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function

    //if user exist return same uer else create
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      //  console.log(profile);
       console.log(profile);
        if (currentUser) {
            console.log('the user is ' + currentUser)
            done(null,currentUser);
        } else {
            new User({
                userName: profile.displayName,
                googleId: profile.id,
                email:profile._json.email,
                thumbnail:profile._json.picture
            }).save().then((newUser) => {
                console.log('new user created ' + newUser);
                done(null,newUser);
            })
        }
    })



})
)
