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