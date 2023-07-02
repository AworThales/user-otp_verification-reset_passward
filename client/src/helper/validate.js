import Toast from "react-hot-toast";

// validating login page usernme
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    return errors;
}

// Validate Password
export async function passwordValidated(values){
    const errors = passwordVerify({}, values);

    return errors;
}

// validating rest password
export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pass){
        errors.exist = Toast.error("Password does not match...!");
    }

    return errors;
}

//* ************************************************** */
/** validating password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = Toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = Toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = Toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = Toast.error("Password must have special character");
    }

    return errors;
}

// validatting username
function usernameVerify(error = {}, values) {
    // return error is the username does not have values
    if(!values.username){
        // error.username = "Username Required"
        error.username = Toast.error('Username Required...!')
    }else if(values.username.includes(" ")){
        // return error is the username value includes an empty string as value
        error.username = Toast.error('Invalid Username...!')
    }

    // return  error object, if we have errors only when we have values inside the error object
    return error;
}