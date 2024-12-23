import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "6a9b7036b6ea75",
    pass: "65278b3e1b7ccf"
    //TODO: add these to .env file
    }
});


export const sendEmail = async ({ email, emailType, userId }: { email: string; emailType: string; userId: string }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });

      const mailResponse = await transport.sendMail({
        from: 'basare471@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: `<p>Click the link below to reset your password:</p> 
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
        style="display: inline-block; padding: 10px 20px; 
                      background-color: #2DD4BF; color: white; 
                      text-decoration: none; border-radius: 4px;">
              to verify your email
            </a>
            <p>This link expires in 1 hour</p>`
      });

    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });

      const mailResponse = await transport.sendMail({
        from: 'basare471@gmail.com',
        to: email,
        subject: 'Reset Your Password',
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Reset Your Password</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}" 
               style="display: inline-block; padding: 10px 20px; 
                      background-color: #2DD4BF; color: white; 
                      text-decoration: none; border-radius: 4px;">
              Reset Password
            </a>
            <p>This link expires in 1 hour</p>
          </div>
        `
      });
    }

    return hashedToken;

  } catch (error: any) {
    throw new Error(error.message);
  }
}