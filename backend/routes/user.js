//"use strict";
const zod = require("zod");
const { User } = require("../database/db");
const express = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../authMiddleware/config");
const { middleware } = require("../authMiddleware/middleware");
const bcrypt = require('bcryptjs');
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName:  zod.string(),
    password: zod.string()
})
router.post("/signup", async(req, res) =>{
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const seqPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        username: req.body.username,
        password: seqPass,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        
    });
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if(!comparePassword){
        return res.status(400).json({
            msg: "Incorrect Password"
        })
    }

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            name: user.firstName,
            token: token
        })
        return;
    } 
    res.status(411).json({
        message: "Error while logging in"
    })
        
})
// update user
const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    gender: zod.string().optional(),
    location: zod.string().optional(),
    birthday: zod.string().optional(),
    summary: zod.string().optional(),
    website: zod.string().optional(),
    github: zod.string().optional(),
    linkedin: zod.string().optional(),
    twitter: zod.string().optional(),
    work: zod.string().optional(),
    education: zod.string().optional(),
    skills: zod.array(zod.string()).optional(),
})

router.put('/update', middleware.userAuthentication, async(req, res)=>{
    const { success } = updateUser.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
}

    const salt = await bcrypt.genSalt(10);
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    await User.updateOne({_id : req.userId}, req.body);

    res.json({
        message: "Updated successfully"
    })
})

// Search other users
// query parameter: ?filter = ankur

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// get user with object id
router.get("/getuser/:userId", async (req, res)=>{
    const userId = req.params.userId;
    
    try{
    const user = await User.findById({
        _id: userId
    })
    res.json({
        user: user.firstName,
        profile: user
    })}
    catch(e){
        res.json(e);
    }
})

module.exports = router;