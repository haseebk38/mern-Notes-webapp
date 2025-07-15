// this folder is to create our custom middlewares from that ustash.js instance(blueprint)
import ratelimit from "../config/upstash.js"; // import the instance
const rateLimiter = async (req,res,next) => {
     try {
        const {success} = await ratelimit.limit("my-limit-key");// we have to put user id or athuntication
        if(!success){
            return res.status(429).json({message:"Too many request please try again later"});
        }
        //else
        next();
     } catch (error) {
        console.log("Ratelimit Error",error);
        next(error);
     }
}

export default rateLimiter;