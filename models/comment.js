var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: 
        {
            id:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            username: String       // better than looking up for the correct author username everytime a comment is printed out
        }
});

module.exports = mongoose.model("Comment", commentSchema);