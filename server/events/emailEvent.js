const EventEmitter = require('events');
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber.model');

class EmailEvent extends EventEmitter {}

const emailEvent = new EmailEvent();

// Lắng nghe sự kiện gửi email
emailEvent.on('sendEmail', async ({ subject, content }) => {
    try {
        const subscribers = await Subscriber.find();
        const emailList = subscribers.map((sub) => sub.email);

        if (emailList.length === 0) {
            console.log('No subscribers to send email to.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"TOMTOC PERFURMS 👻" <${process.env.EMAIL_USER}>`,
            to: emailList,
            subject,
            text: content,
        };

        await transporter.sendMail(mailOptions);
        console.log('Emails sent successfully.');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
});

module.exports = emailEvent;
