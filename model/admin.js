import mongoose from "mongoose";

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
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
