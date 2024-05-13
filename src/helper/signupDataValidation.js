
import validator from "validator";


export default function SignupDataValidation(name, email, password, confirmPassword, role) {

    // If Name field length is less than 0 
    if (name.length === 0) {
        return { error: "Name Field is required" };
    }



    // CHECKING THE EMAIL IS VALID OF NOT? 
    if (!validator.isEmail(email)) {
        return { error: "Invalid email address" };
    }

    // PASSWORD VALIDATION AND MIN LENGTH OF THE PASSWORD
    if (!validator.isLength(password, { min: 8 })) {
        return { error: "Password must be at least 8 characters long" };
    }


    // Password criteria checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

    if (!passwordRegex.test(password)) {
        return {
            error: "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
        };
    }

    // CHECKING THE PASSWORD AND CONFIRM PASSWORD ARE SAME OR NOT? 
    if (password !== confirmPassword) {
        return { error: "Password & Confirm-Password must be matched" };
    }

    // CHECKING THE ROLE IS SELECTED OR NOT?
    if (role === 'none') {
        return { error: "Please Select Your Role" };
    }




    // Other validation checks...

    return { success: true };
}

