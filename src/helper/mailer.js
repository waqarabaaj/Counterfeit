import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcrypt from 'bcrypt';


export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // create a hased token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f37ad609fe1f67",
                pass: "16b5d18a9bc76d"
                //TODO: add these credentials to .env file
            }
        });


        // const mailOptions = {
        //     from: 'authenticare@gmail.com',
        //     to: email,
        //     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //     html: `<p>Click <a href="${process.env.DOMAIN}/pages/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/pages/verifyemail?token=${hashedToken}
        //     </p>`
        // }

        const mailOptions = {
            from: 'authenticare@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${emailType === "VERIFY" ? `${process.env.DOMAIN}/pages/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN}/pages/resetPassword?token=${hashedToken}`}">here</a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${emailType === "VERIFY" ? `${process.env.DOMAIN}/pages/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN}/pages/resetPassword?token=${hashedToken}`}
            </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        console.log("email is send check your mailtrap box")
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}