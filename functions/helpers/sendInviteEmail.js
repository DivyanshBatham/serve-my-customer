const nodemailer = require("nodemailer");
const functions = require('firebase-functions');

const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: functions.config().nodemailer.email,
        pass: functions.config().nodemailer.password
    }
});


const sendVerificationEmail = (email, companyName, inviteToken) => {

    const mailOptions = {
        from: `"Candids" <${functions.config().nodemailer.email}>`,
        to: email,
        subject: "Invitation to join Serve My Customer",
        text: "Invitation to join Serve My Customer",
        html: `
        <div
        class="email-background"
        style="background: whitesmoke;font-family: sans-serif;text-align: center;font-size: 15px;padding: 14px 18px;"
        >
            <div
            class="email-container"
            style="max-width: 650px;margin: 16px auto;background: white;padding: 32px;text-align: center;border-radius: 5px;"
            >
            <h1 style="font-size: 1.7em;margin-bottom: 1em;color: #323232;">
                Invitation to join Serve My Customer
            </h1>
            <p style="line-height: 1.2em;color: #505050;">
                You have been invited you to join <strong>${companyName}</strong> on
                Serve My Customer.
            </p>
            <p style="line-height: 1.2em;color: #505050;">
                Join now and start serving your customers!
            </p>
    
            <a
                class="cta"
                href="https://serve-my-customer.firebaseapp.com/invite/${inviteToken}"
                style="color: white;font-weight: 500;transition: all 0.2s ease-in-out;text-decoration: none;background: #3464E0;display: inline-block;font-size: 1.2em;padding: 0.7rem 2.5rem;border-radius: 0.5rem;margin: 1em 0;box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);line-height: 1em;"
                >Join Now</a
            >
            <hr style="border: 0;border-top: 2px solid whitesmoke;margin: 30px;" />
            <p
                class="note"
                style="line-height: 1.2em;color: #505050;margin-top: 3em;font-size: 0.9em;"
            >
                NOTE: This link is only valid for 1 day.
            </p>
            </div>
        </div>
            `
    };

    return mailTransport
        .sendMail(mailOptions)

}

module.exports = sendVerificationEmail