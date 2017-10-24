var xpress          = require("express"),
    app             = xpress(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");
    


var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");


//================================
// Database Seeding

var SeedDB = require("./seeds");
SeedDB();



//================================
// App configuration
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);


app.use(bodyParser.urlencoded({extended:true}));    //check documentation, needed in every app that listen for posts
app.set("view engine", "ejs");
app.use(xpress.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//===============================
// Passport configuration
app.use(require("express-session")({
    secret: "Can be anything",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//user authenticate is a method that comes with local strategy package
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//================================
// pas current user as a variable to all routes
app.use(function(req, res, next){//this will be used as middleware for all the routes
    res.locals.currentUser  = req.user;
    res.locals.msgError     = req.flash("error");
    res.locals.msgSuccess    = req.flash("success");
    next();
});


app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



//============================================

app.listen(process.env.PORT, process.env.IP, function() {//needed in every app copy paste
    console.log("Server final project has started!");
});