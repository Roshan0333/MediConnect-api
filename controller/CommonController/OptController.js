let nodemailer = require('nodemailer')

let Otp_Create = async (req, res) => {
    try {
        let First = parseInt(Math.random() * 10).toString();
        let Second = parseInt(Math.random() * 10).toString();
        let Third = parseInt(Math.random() * 10).toString();
        let Fourth = parseInt(Math.random() * 10).toString();

        let OTP = First + Second + Third + Fourth;

        let userEmail = req.body.email;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "logine786@gmail.com",
                pass: "xeze fjrs ydxd mkhh"
            }
        })


        await transporter.sendMail({
            from: `"MediConnect" <logine786@gmail.com>`,
            to: userEmail,
            subject: "Your MediConnect Verification Code",
            html: `<div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #0066cc;">MediConnect</h2>
                    <p>Your One-Time Password (OTP) for verifying your MediConnect account is:</p>
                    <h1 style="color: #333;">${OTP}</h1>
                    <p>This OTP will expire in <b>5 minutes</b>.</p>
                    <p>Do not share this code with anyone.</p>
                    <br />
                    <p>– The MediConnect Team</p>
                    </div>`,
        })

        return res.status(200).json({ status:200, Otp: OTP })

    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message })
    }
}

module.exports = Otp_Create