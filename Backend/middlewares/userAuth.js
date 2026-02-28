import jwt from "jsonwebtoken";


const userAuth = async (req , res , next)=>{
    const {token} = req.cookies;


    if (!token) {
        return res.status(401).json({success:false, message: "Unauthorized - No token" });
    }

    try {
        
        const decode  = jwt.verify(token, process.env.JWT_SECRET);
        if(decode.userId){
            req.userId = decode.userId;
        }
        else {
            return res.json({
                success:false,
                message:"user not authorized , login again !"
            })
        }
     next();
        
    } catch (error) {
      
        return res.status(401).json({ success : false, message: "Hii" });
    }
}


export default userAuth;