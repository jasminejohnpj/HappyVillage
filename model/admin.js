import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../env.js"
const adminSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

// ✅ Hash password before save
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare passwords
adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Generate Access Token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, mobile: this.mobile },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

// ✅ Generate Refresh Token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
