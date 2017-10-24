var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [ // define this property as array of comment id's
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ],
    author: 
        {
            id: String,
            username: String       // better than looking up for the correct author username everytime a comment is printed out
        }
});

module.exports = mongoose.model("campground", campgroundSchema);

