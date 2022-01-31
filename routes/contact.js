import { Router } from 'express';
import { google } from 'googleapis';
import path from 'path';
import { createTransport } from 'nodemailer';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_CLIENT = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

GMAIL_CLIENT.setCredentials({ refresh_token: REFRESH_TOKEN });

let router = Router();
const __dirname = path.resolve();

router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '/pages/contact.html'));
})
.post((req, res) => {
    async function sendMail() {
        try {
            const ACCESS_TOKEN = await GMAIL_CLIENT.getAccessToken();
            const transport = createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'rafi.md.2018@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: ACCESS_TOKEN
                }
            });

            const mailOptions = {
                from: 'rafi.md.2018@gmail.com',
                to: 'rafi.md.2018@gmail.com',
                subject: 'Portfolio Contact Form Response',
                text: `${req.body.message}\n\n--\nName: ${req.body.name}\nEmail: ${req.body.email}`
            }

            const result = await transport.sendMail(mailOptions);
            return result;
        }
        catch (error) {
            return error;
        }
    }
    sendMail().then((result) => {
        console.log(result);
        res.sendStatus(200);
    })
    .catch((error) => console.log(error.message));
});

export default router;