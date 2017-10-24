var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//var methodOverride = require("method-override");
//=================================
// Campground ROUTES

//express().use(methodOverride("_method"));


// INDEX - show all campgrounds
router.get("/", function(req,res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",
                {
                    campgrounds: campgrounds,
                    title: "Campgrounds"
                }
            );
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new", {title: "New Campground"});
});//REST convenction

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){//named as get route still works fine but REST convention need same url
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author: author};
   // create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            //redirect to campground page
            req.flash("success", "Created new Campground!");
            res.redirect("/campgrounds");//by default redirect is a get request
       }
   });
});

// SHOW - shows more info about campground
router.get("/:id", function(req, res){// must be below "/campgrounds/new"
    // find the campground with the provided id
    //Campground.findById(req.params.id, function(err, foundCamp){   // mongoose method (id, callback)
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){  //populate("comments").exec(   is used to populate with comments instead of comments ids    //.exec executes query
        if(err){
            console.log(err);
        } else {
            // console.log(foundCamp);
            // render show template with that campground
            res.render("campgrounds/show",{campground: foundCamp, title: foundCamp.name});
        }
    });
});



//===== edit and update =====
// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCamp});
        }
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//===== delete route =====
// Destroy route    // 249
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Deleted!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;