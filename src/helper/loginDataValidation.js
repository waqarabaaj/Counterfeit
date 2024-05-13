"use client"
import validator from "validator";


export default function LoginDataValidation(email, password) {





    // CHECKING THE EMAIL IS VALID OF NOT? 
    if (!validator.isEmail(email)) {
        return { error: "Invalid email address" };
    }

    // PASSWORD VALIDATION AND MIN LENGTH OF THE PASSWORD
    if (!validator.isLength(password, { min: 1 })) {
        return { error: "Please Enter Your Password" };
    }


    // Password criteria checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

    // if (!passwordRegex.test(password)) {
    //     return {
    //         error: "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
    //     };
    // }

    // CHECKING THE ROLE IS SELECTED OR NOT?
    // if (role === 'none') {
    //     return { error: "Please Select Your Role" };
    // }




    // Other validation checks...

    return { success: true };
}

