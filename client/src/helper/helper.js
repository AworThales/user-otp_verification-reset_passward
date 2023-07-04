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

