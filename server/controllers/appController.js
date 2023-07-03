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
    res.json("This is register route");
}


/**POST request: hhtp://localhost:8080/api/login
 * @param : {
    "username": "thallo",
    "password": "admin1"
 } 
 */
export async function login(req,res){
    res.json("This is Login route");
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

