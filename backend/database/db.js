const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://ankurkumarsingh225:0BzxA5RHvSorsHNp@cluster0.tr7gx1q.mongodb.net/testing")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLenght: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    gender:{
        type:String,
        trim: true
    },
    location:{
        type: String,

    },
    birthday:{
        type: String
    
    },
    summary:{
        type: String
    },
    website:{
        type:String
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    twitter:{
        type:String
    },
    work:{
        type:String
    },
    education:{
        type:String
    },
    skills:[{
        type:String
    }]


});

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
     },
    
    reply:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    public: {
        type: Boolean,
        default: false
    },
    Tags:[{
        type:String,
        trim: true
    }],
    

})

const commentSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        
    },
    firstName:{
        type: String,
        required: true,
        trim: true
    }
})




const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
    User,
    Post,
    Comment
}