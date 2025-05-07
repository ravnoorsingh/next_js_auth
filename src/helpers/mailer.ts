import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
      // TODO: Configure mail for usage

        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if(emailType === 'VERIFY'){
          await User.findByIdAndUpdate(userId, 
            {verifyToken:hashedToken, verifyTokenExpiry: Date.now() + 360000}
          )
        } else if(emailType === 'RESET'){
          await User.findByIdAndUpdate(userId, 
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}
          )
        }

      
        // Looking to send emails in production? Check out our Email API/SMTP product!
          var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e13d9c5976ef28",
              pass: "ce04281d4f6e57"
            }
          });

          const mailOptions = {
            from: 'rav@rav.ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
        
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