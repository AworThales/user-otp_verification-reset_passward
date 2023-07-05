import axios from "axios";

// Mkaing API Request

// authenticate function
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate', { username })
    } catch( error ) {
        return { error: "Username doesn't exit...!"}
    }
}


/** Getting users details */
export async function getUser({ username }){
    try{
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't match...!"}
    }
}

/** Registering user */
export async function registerUser(credentials){
    try{
       const { data : msg, status } = await axios.post(`/api/register/`, credentials);

        // getting this vairables ffrom the credentials
       let { username, email } = credentials;

        /** sending email to user */
        // checking if status in our backend api is 201, thats OK
        if(status === 201 ){
            await axios.post('/api/register/', { username, userEmail: email, text: msg })

            return Promise.resolve(msg);
        }
        
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** Login user function */
export async function verifyPassword({ username, password }){
    try{
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error){
        return Promise.reject({ error: "Password doesm't match...!"})
    }
}

/** Updating user profile function */
export async function updateUser(response){
    try{

        // storing token in the localstorage, so we can it there
        const token = await localStorage.getItem('token')
        const data = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}`}});

        return Promise.resolve({ data });
    } catch ( error ){
        return Promise.reject({ error: "Couldn't update profile...!"}) 
    }
}

/** Generatinf OTP */
export async function generateOTP(username){
    try{
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username }});

        // sending mail with OTP but verying first that the status of generated OTP is OK
        if(status === 201){
           let { data: { email }} = await getUser({ username });
           let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`
           await axios.post('/api/registerMail/', { username, userEmail: email, text, subject: "Password Recovery OTP"})
        }

        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** Verifying OTP */
export async function verifyOTP({ username, code }){
    try{
       const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code }})
       return {data, status };
    } catch (error) {
        return Promise.reject(error);
    }
}

/** Reseting password */
export async function resetPassword({ username, password }) {
    try{
        const { data, status } = await axios.put('/api/resetPassword', { username, password});
        return Promise.resolve({ data, status });
    } catch ( error ) {
        return Promise.resolve({ error });
    }
}