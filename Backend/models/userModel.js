import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
       select: false, // by default password fetch nahi hoga
    },
    verifyotp:{
        type:String,
        default:'',
    },

    verifyotpExpiryAt:{
        type:Number,
        default:0,
    },

    resetotp:{
      type:String,
      default:'',
    },

    resetotpExpiryAt:{
      type:Number,
      default:0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User =  mongoose.models.user||mongoose.model('user', userSchema);

export default User;

