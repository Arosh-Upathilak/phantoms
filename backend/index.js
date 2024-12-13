require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  connect();
const User=require("./models/user");


const express = require('express');
const cors = require('cors');
const app =express();
const jwt = require("jsonwebtoken");
const {authenticatedRoute, authenticateToken} = require("./utilities");

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.get('/',(req,res)=>{
    res.json({data:"Hello"});
});

//Backend Ready!!

//create account
app.post("/createAccount",async (req,res)=>{
    const {fullName,email,password,userName,uniReg,university} = req.body;
    if(!fullName ){
        return res.status(400).json({error:"Full name is required"});
    }
    if(!userName){
        return res.status(400).json({error:"Full name is required"});
    }
    if(!email ){
        return res.status(400).json({error:"Full name is required"});
    }
    if(!password ){
        return res.status(400).json({error:"Full name is required"});
    }
    if(!uniReg){
        return res.status(400).json({error:"Email is required"});
    }
    if(!university){
        return res.status(400).json({error:"Password is required"});
    }
    const isUser =await User.findOne({email});
    if(isUser){
        return res.json({
            error:true,
            message:"User already exists"
        });
    }
    const user = new User({fullName,email,password,userName,uniReg,university});

    await user.save();
    const accessToken =jwt.sign({
        user},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"36000m"
        });
        
        return res.json({
            error:false,
            user,
            message:"User created successfully",
            accessToken
        });
});

//login
app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({message:"Password is required"});
    }

    const UserInfo =await User.findOne({email});
    if(!UserInfo){
        return res.status(400).json({
            error:true,
            message:"User does not exist"
        });
    }
    if(UserInfo.email == email && UserInfo.password == password){
        const user={user:UserInfo};
        const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"3600000m"
        });
        return res.json({
            error:false, 
            message:"User logged in successfully",
            accessToken
        });
    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid credentials"
        });
    }
    
})



app.get("/get-user",authenticateToken,async (req,res)=>{
    const {user} =req.user;
    const isUser =await User.findOne({_id:user._id});
    if(!isUser){
        return res.sendStatus(401);
    }
    return res.json({
        user:{fullName: isUser.fullName, email: isUser.email, "_id": isUser._id,createdOn: isUser.createdOn},
        message:"",
    });
})

const Product = require("./models/project");

app.post("/newproduct", async (req, res) => {
  const { Title, Description, price, image, uniReg, university } = req.body;

  // Validate required fields
  if (!Title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!Description) {
    return res.status(400).json({ error: "Description is required" });
  }
  if (!price) {
    return res.status(400).json({ error: "Price is required" });
  }
  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  // Check if a product with the same university registration number already exists
  const existingProduct = await Product.findOne({ uniReg });
  if (existingProduct) {
    return res.status(400).json({
      error: "Product already exists",
    });
  }

  // Create the new product
  const newProduct = new Product({
    Title,
    Description,
    price,
    image,
    uniReg,
    university,
  });

  try {
    // Save the product to the database
    await newProduct.save();

    return res.json({
      error: false,
      product: newProduct,
      message: "Product created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "An error occurred while saving the product. Please try again.",
    });
  }
});









app.listen(8000);

module.exports =app;