const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js");
const generateToken = require("../config/generateToken.js");

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password ){
        res.status(400);
        throw new Error("please Enter all th fields");
    }

    const userExixts = await User.findOne({ email });

    if (userExixts) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

//Login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await User.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or pasword");
    }
})

//chat gpt suggestion
// const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const user = await User.create({ name, email, password });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



module.exports = { registerUser , authUser };