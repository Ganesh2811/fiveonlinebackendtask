const express = require('express');
const cors = require('cors');
require('./db/config');
require("dotenv").config();
const User = require("./db/User");
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

app.post("/share", async (req, resp)=>{
    try {
        // Save user data to the database
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();

        if (result) {
            // Email configuration
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: 'gp11282001@gmail.com', 
                    pass: 'ivgp mgmz yjtc esfs'
                }
            });

            // Email options
            const mailOptions = {
                from: 'gp11282001@gmail.com',
                to: 'gp11282001@gmail.com,  helpdesk@fiveonline.in',
                subject: 'Rathanbor Inquiry Center',
                text: `Hello,

                Thank you for reaching out to us. Here are the details you provided:
                
                First Name: ${req.body.firstName}
                Last Name: ${req.body.lastName}
                Contact: ${req.body.contact}
                Email: ${req.body.email}
                Message: ${req.body.message}
                
                Ranthambore National Park Information:
                
                Ranthambore National Park, located in the Sawai Madhopur district of southeastern Rajasthan, is one of the largest and most renowned national parks in Northern India. The park is known for its population of Bengal tigers, which can often be seen hunting during the day. Apart from tigers, Ranthambore is home to a variety of wildlife including leopards, nilgai, wild boar, sambar, hyena, sloth bear, and chital.
                
                The park also features the historic Ranthambore Fort, which offers a panoramic view of the park and its surroundings. The fort is a UNESCO World Heritage site and adds to the park’s rich historical and cultural significance.
                
                Visitors to Ranthambore can enjoy a range of activities including guided safaris, bird watching, and exploring the ruins within the park. The best time to visit Ranthambore is between October and April when the weather is pleasant, and the chances of spotting tigers are higher.
                
                We hope you find this information useful. If you have any further questions or need additional details, please do not hesitate to contact us.
                
                Best regards,
                
                [Ganesh Pawar]
                [Head Of the department]
                [9987048004]`
            };

            // Sending the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email: ', error);
                    return resp.status(500).send({ result: "Failed to send email" });
                }
                console.log('Email sent: ' + info.response);
                resp.send({ result: "User saved and email sent", user: result });
            });
        } else {
            resp.status(500).send({ result: "Failed to save user" });
        }
    } catch (error) {
        console.error('Error: ', error);
        resp.status(500).send({ result: "Internal Server Error" });
    }
})

app.listen(process.env.PORT, ()=>{
    console.log("port is running");
});
