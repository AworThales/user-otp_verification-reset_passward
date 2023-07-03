import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";


/** POST request: hhtp://localhost:8080/api/register
 * @param : {
    "username" : "thallo",
    "password" : "admin1",
    "firstName" : "Thales",
    "lastName" : "Awor",
    "mobile" : "0803736363",
    "address" : "9 Atambga Street, Akmakpa",
    "profile" : ""
 }
 */

export async function register(req,res){
    try{
        // recieving data from the users
        const { username, password, profile, email } = req.body;

        // checking is user already exist
        const existUsername = new Promise((resolve, reject) =>{
            UserModel.findOne({ username }, function(error, user){
                if(error) reject(new Error(error))
                if(user) reject({error: "Please use unique username"});

                // if it does not found this user in our database then return resolve
                resolve();
            });
        });

        // checking for existing email
        const existEmail = new Promise((resolve, reject) =>{
            UserModel.findOne({ email }, function(error, email){
                if(error) reject(new Error(error))
                if(email) reject({error: "Please use unique Email"});

                resolve();
            });
        });

        Promise.all([existUsername, existEmail])
            .then(() =>{
                // hashing password
                if(password){
                    bcrypt.hash(password, 10)
                        // result is going to return promise
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save results as a response
                            user.save()
                                .then(result => res.status(201).send({msg: "User Registration successful"}))
                                .catch(error => res.status(500).send({error}))
                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable password hashed"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })

    }catch(error){
        return res.status(500).send(error);
    }
}


/**POST request: hhtp://localhost:8080/api/login
 * @param : {
    "username": "thallo",
    "password": "admin1"
 } 
 */
export async function login(req,res){
    // recieving user input
    const { username, password} = req.body;

    try{
        // finding user in our model it username
        UserModel.findOne({ username })
            // if you find give us a result promise
            .then(user => {
                bcrypt.compare(password, user.password)
                    // give us a promise return result
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status(400).send({error: "Wrong Password"})

                        // creating jwt token
                        const token =   jwt.sign({
                                        userId: user._id,
                                        username: user.username,
                                        }, ENV.JWT_SECRET, { expiresIn: "24h"});
                        return res.status(200).send({
                            error: "Succesfully Login...!",
                            username: user.username,
                            token
                        })
                    })
                    // otherwise throw an eror
                    .catch(error => {
                        return res.status(400).send({error: "Password does not match"})
                    })
            })
            // otherwise give us an error
            .catch(error => {
                return res.status(404).send({error: "Username not found"})
            })

    }catch(error){
        return res.status(500).send({ error })
    }
}

/** POST request: hhtp://localhost:8080/api/user/thallo */
export async function getUser(req,res){
    res.json("This is getUser Route");
}

/**Put request: hhtp://localhost:8080/api/updteUser
 * @param : {
    "id": "userid"
    }
    body: {
        firstName: "",
        address: "",
        profile: ""
    }
 */

export async function updateUser(req,res){
    res.json("This is updateUser route");
} 


/** GET Request: hhtp://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    res.json("This is genereteOTP route");
}

// /**GET Request: hhtp://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    res.json("This is verifyOTP Route");
}


// sucessfully redirect user when OTP is valid
/** GET Request: hhtp://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    res.json("This iscreateResetSession Route");
}


// This will user password when we have a valid session
/** PUT request: hhtp://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    res.json("This is resetPassword route");
}

