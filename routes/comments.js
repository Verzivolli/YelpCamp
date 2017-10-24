var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//=============================================
// Comment Routes

// New Route
// Must be loged in
// Must protect and post request
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id to send it to the new template as variable
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground, title: "New Comment"});
        }
    });
});

//Create route
router.post("/", middleware.isLoggedIn, function(req, res){

    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Campground not found!");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong. We are working to fix that.");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // add comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added new comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});



// =====Edit routes ======
//Comment edit route
// Show edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        } else {
              res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    });
});

// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
           res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;