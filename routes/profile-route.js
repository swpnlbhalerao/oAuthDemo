const router=require('express').Router();

const authCheck=(req,res,next)=>{
if(!req.user){
    res.redirect('/auth/login')
}else{
    next();
}

}

router.get('/',authCheck,(req,res)=>{
/*     res.send('ur logging in as '+req.user.userName); */
res.render('profile',{user:req.user});
});

module.exports=router;