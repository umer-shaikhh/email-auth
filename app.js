import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { config } from 'dotenv'
import router from './routes/index.js'

const app = express();
config()

// Session and Passport setup
app.use(session({
    secret: 'some_random_secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/connect', router.authRouter);
app.use('/emails', router.emailRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;  // For testing










// import express from 'express';

// const app = express();
// const port = 3000;



// // Route to initiate Gmail OAuth flow with a specific email
// app.get('/connect/email', (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).send('Email is required.');
//   }

//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/gmail.readonly'],
//     login_hint: email, // Pass the email as a hint
//   });

//   res.redirect(authUrl);
// });

// // Callback route for handling OAuth response
// app.get('/auth/gmail/callback', async (req, res) => {
//   console.log("Im here")
//   const { code } = req.query;

//   try {
//     const { tokens } = await oAuth2Client.getToken(code);
// console.log(tokens, "tokens")
//     // Store tokens securely for future use
//     // Handle the authenticated user's email as needed

//     res.send('Authentication successful! You can now make Gmail API requests.');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Authentication failed.');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

