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
