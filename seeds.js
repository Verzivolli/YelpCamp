var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User            = require("./models/user");

var data =[
    {
        name: "Santa Cruz / Monterey Bay KOA",
        image: "http://koa.com/content/campgrounds/santa-cruz/photos/4367a01d-44aa-463d-8035-485032949b4ephoto968463b1-d121-46d3-9cfd-6aa8c611f56c.jpg.axd?preset=campgroundphoto",
        description: "As seen on the hit CBS show, Undercover Boss, the Santa Cruz/Monterey Bay KOA offers something for everyone! Enjoy the best of the California coast at this fun, family-friendly campground. "
        , author : {
            id: "59a7c3a35a38f812de32e605",
            username: "kackavalli"
        }
    },
    {
        name: "Madison KOA",
        image: "http://koa.com/content/campgrounds/madison/photos/DSC00392.jpg.axd?preset=campgroundphoto",
        description: "Looking for a conveniently located full-hookup Pull-Thru RV Site for the night? Ready to relax and spend a few days visiting southern Wisconsin's many attractions? Whatever the reason, you'll always find a warm welcome at Madison KOA. Kids enjoy the playground, and pets have their own K9 park for exercise. The friendly staff can direct you to restaurants and help you find plenty of things to see and do. If you need auto/RV repairs, the staff can put you in contact with nearby repair facilities. Area attractions include: Capitol Square, UW campus, House on the Rock, Henry Vilas Zoo, Frank Lloyd Wright's Taliesin, museums, golf courses, wineries, breweries, casinos, bike trails, fishing and boating. Back at KOA, you can play a yard game, take a dip in the heated pool, toss horseshoes or relax by a campfire. Pool: Memorial Weekend - Labor Day Weekend. Max pull thru: 80 feet. Your hosts: Arnold & Terri Bernatchy."
        , author : {
            id: "59a7c3a35a38f812de32e605",
            username: "kackavalli"
        }
    },
    {
        name: "Willits KOA",
        image: "http://koa.com/content/campgrounds/willits/photos/8b4b6d1f-1e55-4f39-9c72-125404538212photoc8fcae45-1c6a-4012-b8ba-9448edbf411b.jpeg.axd?preset=campgroundphoto",
        description: "The Willits KOA features an 'Old West' theme and is laid out on a peaceful country setting with rolling hills and trees. The campground has something for everyone, including a swimming pool, fishing pond, petting zoo, mini golf, playtower, arcade, rental bikes, disc golf course, waterspray park, hiking trails, and much more. Our National award winning summer recreation program includes, ice cream socials, and live entertainment featuring hula hoop and limbo contests, and not to mention all of our dances, including, chicken dance, macarena, superman, cha cha slide, electric slide, hokey pokey and so many more. The Willits koa aims to provide a fantastic experience for the whole family and ensuring that the whole family leaves with lasting memories."
        , author : {
            id: "59a7c3a35a38f812de32e605",
            username: "kackavalli"
        }
    }
]

var tempCommentCounter = 0;

function SeedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Campgrounds removed");
            //add some campgrounds
            data.forEach(function(seed){ // must be in callback function to be sure it will be executed after campground.remove
                Campground.create(seed, function(err, createdCampground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        /*//add some comments*/
                        // tempCommentCounter += 1;
                        // var commentText = "This is comment number" + tempCommentCounter;
                        // var commentAuthor = "Author of comment nr" + tempCommentCounter;
                        // Comment.create(
                        //     {
                        //         text: commentText,
                        //         author: commentAuthor
                        //     }, function(err, createdComment){
                        //         if(err){
                        //             console.log(err);
                        //         } else {
                        //             console.log("created new comment");
                        //             createdCampground.comments.push(createdComment);
                        //             createdCampground.save();
                        //         }
                        // }) // when creates comment gives error on campground show route if logged in
                    }
                });
            });
        }
        
    });
    
    
    
}

module.exports = SeedDB;