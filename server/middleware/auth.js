import jwt from "jsonwebtoken";
import ENV from "../config.js";

// auth middleeware
export default async function Auth(req, res, next){
    try{

        // Accessing authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // receiving the user details for the login user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).send({ error : "Authenication failed!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next();
}