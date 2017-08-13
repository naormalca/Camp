var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          =  require("./models/user"),
    methOverride  = require("method-override"),
    Comment       = require("./models/comment"),
    flash         = require("connect-flash");
    
//requring routes
var commentsRoutes = require("./routes/comments"),
    campgroundRoutes =require("./routes/campgrounds"),  
    authRoutes       = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/public"));//first dir script runing
app.use(methOverride("_method"));
app.use(flash());
//seedDB();
//SCHEMA SETUP
/*Campground.create(
    {
        name:"Grantie Hill",
        image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description:"Blue White And StormFace"
    },function(err, campground){
       if(err){
           console.log(err);
       } else{
           console.log("NEW CAMPGROUND CREATED");
           console.log(campground);
       }
    });*/
    
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "naor",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;//pass user req
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);



app.listen(process.env.PORT, process.env.IP,function(){
   console.log("YeleCamp Server Strated!"); 
});