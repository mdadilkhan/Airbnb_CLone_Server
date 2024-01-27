import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import env from "dotenv";
env.config();
const hashing = async (plaintextPassword) => {
  try {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    console.log("Hashed Password:", hash);
    return hash;
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle the error differently based on your application needs
  }
};

function generateJwtToken(payload, secretKey) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, name, password } = req.body;
    const hashedPassword = await hashing(password);
    const newUser = new User({ email, name, hashedPassword });
    const data = await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "User Created Successfully", data });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const matchPassword = await bcrypt.compare(password, user.hashedPassword);
    console.log(matchPassword);
    if (!matchPassword) {
      return next(errorHandler(401, "Invalid Credential"));
    }
    const token = generateJwtToken({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 300000);
    const { hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .send({ success: true, message: "Login Successfully!!", data: rest });
  } catch (error) {
    console.log("catch");
    next(error);
  }
};

// export const fetchUser=async(req,res,next)=>{
//   try {
//     console.log(req.body);
//     const token = req.cookies.access_token;
//     console.log("token>>",token);
//     if(!token)return next(errorHandler(404,"Access token not found"))
//     const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
//    if(!decodedToken)return next(errorHandler(401,"Invalid token"))
//    const userId=decodedToken.id
//   console.log("userID>>",userId);
//   const user=await User.findById(userId);
//   if(!userId)return next(errorHandler(404,"User not found"))
//   const { hashedPassword, ...rest } = user._doc;
//   res.status(200).json({ success: true, data: rest });
//   } catch (error) {
//     console.log("catch");
//     next(error)
//   }
// }

export const fetchUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!userId) return next(errorHandler(404, "User not found"));
    const { hashedPassword, ...rest } = user._doc;
    res.status(200).json({ success: true, data: rest });
  } catch (error) {
    console.log("catch");
    next(error);
  }
};



export const logoutUser = async (req, res, next) => {
  console.log("inside logout");
  res.clearCookie("access_token", {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).send({ success: true, message: "Logout successful" });
};

export const google = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log("inside try");
    console.log("email", req.body.email,req.body.name);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("inside eif");
      const token = generateJwtToken({ id: user._id }, process.env.JWT_SECRET);
      console.log("token inside if", token);
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .send({ success: true, message: "Login Successfully!!", data: rest });
    } else {
      console.log("isnide else");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log("generated password", generatedPassword);
      const hashedPassword = await hashing(generatedPassword);
      const newUser = new User({
        email: req.body.email,
        name:req.body.name,
        hashedPassword: hashedPassword,
      });

      await newUser.save();
      const token = generateJwtToken(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      console.log("inside else token", token);
      const { hashedPassword: hashedPassword2, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .send({ success: true, message: "Login Successfully!!", data: rest });
    }
  } catch (error) {
    console.log("inside catch");

    next(error);
  }
};


export const github = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log("inside try");
    console.log("email", req.body.email,req.body.name);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("inside eif");
      const token = generateJwtToken({ id: user._id }, process.env.JWT_SECRET);
      console.log("token inside if", token);
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .send({ success: true, message: "Login Successfully!!", data: rest });
    } else {
      console.log("isnide else");
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log("generated password", generatedPassword);
      const hashedPassword = await hashing(generatedPassword);
      const newUser = new User({
        email: req.body.email,
        name:req.body.name,
        hashedPassword: hashedPassword,
      });

      await newUser.save();
      const token = generateJwtToken(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      console.log("inside else token", token);
      const { hashedPassword: hashedPassword2, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .send({ success: true, message: "Login Successfully!!", data: rest });
    }
  } catch (error) {
    console.log("inside catch");

    next(error);
  }
};
