import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

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
	host: 'mail.your-server.de', // Replace with your mail server
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_ADDRESS,
		pass: process.env.MAIL_PASSWORD,
	},
});

app.post('/send-email', (req, res) => {
	const { email, message } = req.body;

	if (!email || !message) {
		return res.status(400).send('Email and message are required.');
	}

	// const mailOptions = {
	// 	from: email,
	// 	to: process.env.MAIL_ADDRESS,
	// 	subject: 'Contact Request',
	// 	text: message,
	// };

	res.status(200).send('Email sent! & Recapture wieder hinzufügen');

	// transporter.sendMail(mailOptions, (error, info) => {
	// 	if (error) {
	// 		console.error('Error sending email:', error); // Log error details
	// 		return res.status(500).send('Error sending email: ' + error.message);
	// 	}
	//
	// 	console.log('Email sent:', info.response);
	//
	// });
});


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
