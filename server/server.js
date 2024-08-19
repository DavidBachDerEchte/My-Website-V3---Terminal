require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware globally
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const transporter = nodemailer.createTransport({
	host: "mail.your-server.de", //Meine Host Server eintragen
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_ADDRESS,
		pass: process.env.MAIL_PASSWORD,
	},
});

let token = null;
app.post("/recaptcha", (req, res) => {
	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.token}`;

	// Verify the captcha token
	fetch(url, { method: "post" })
	.then((response) => response.json())
	.then((google_response) => {
		if (google_response.success && google_response.score >= 0.5) {

			token = req.body.token;
			res.send({ success: true });
		} else {

			res.status(400).json({ error: "Captcha validation failed" });
		}
	});
});

app.post("/send-email", (req, res) => {
	req = {email, message}
	if (!token) {
		return res.status(403).send("Invalid Request. Missing key");
	}
	token = null;
	// transporter.sendMail({ ...req.body, to: process.env.MAIL_ADDRESS, subject: "Kontaktanfrage" }, (error, info) => {
	// 	if (error) {
	// 		return res.status(500).send("Error sending email: " + error);
	// 	}
	//
	// 	console.log(info);
	// 	res.status(200).send("Email sent!");
	// });

	res.json.send("Works");
});