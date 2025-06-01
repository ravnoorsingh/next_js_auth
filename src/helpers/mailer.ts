import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{ 
                $set: {
                     verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:{
                    forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            }
        )
    }

        // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e13d9c5976ef28",
        pass: "ce04281d4f6e57"
      }
    });


    const mailOptions = {
        from: 'ravnoor@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
    }

    const mailresponse = await transport.sendMail
    (mailOptions);
    return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "3fd364695517df",
//       pass: "7383d58fd399cf"
//       //TODO: add these credentials to .env file
//     }
//   });


// const mailOptions = {
//     from: 'hitesh@gmail.com',
//     to: email,
//     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
//     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//     </p>`
// }

// https://chatgpt.com/share/681c4892-3c28-800c-bf2a-3efc3c3b035e