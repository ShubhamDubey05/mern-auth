import User from "../models/userModel.js";

 export const userData  =  async (req, res)=>{
    try {
        const userId = req.userId;
         
          const user  = await User.findById(userId)
         if(!user){
            return res.json({
              success:false,
              message:"User not found"
            })
         }

         return res.json({
            success:true,
            userdata:{
                userId:user._id,
                name:user.name,
                isVerified:user.isVerified
            }
         })
         
        
    } catch (error) {
         return res.json({
            success : false,
            message :error.message
         })
    }
}