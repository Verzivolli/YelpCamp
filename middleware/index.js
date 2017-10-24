var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own this comment post
                if(foundComment.author.id.equals(req.user._id)){//foundComment.author.id is String and req.user._id is mongoose object
                    next();
                } else{
                    req.flash("error", "You don't have permision to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");// redirects to the previous page
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash("error", "Campground not found!")
                res.redirect("back");
            } else {
                // does user own this campground post
                if(foundCamp.author.id.equals(req.user._id)){//foundCamp.author.id is String and req.user._id is mongoose object
                    next();
                } else{
                    req.flash("error", "You don't have permision to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back"); // redirects to the previous page
    }
};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};




module.exports = middlewareObj;