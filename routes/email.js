import express from 'express';
import { google } from 'googleapis';
const emailRouter = express.Router();
const gmail = google.gmail('v1');


emailRouter.get('/search', async (req, res) => {
    const since = req.query.since;
    const user = req.user;
    if (!user) {
        return res.status(401).send('Not authenticated');
    }
    if (user.provider === 'google') {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: user.accessToken
        });
        try {
            const response = await gmail.users.messages.list({
                userId: user.email,
                q: `after:${since}`,
                auth: oauth2Client
            });
            const hasNewEmails = response.data.resultSizeEstimate > 0;
            res.send(hasNewEmails);
        } catch (error) {
            res.status(500).send('Error fetching emails');
        }
    } else if (user.provider === 'azuread-openidconnect') {
        try {
            // Logic for microsoft emails
            res.send(hasNewEmails);
        } catch (error) {
            res.status(500).send('Error fetching emails');
        }
    } else {
        res.status(400).send('Unsupported email provider');
    }
});

emailRouter.get('/cost', async (req, res) => {
    // ... (Cost calculation logic)
    // This would be similar to the email search but with added logic to calculate cost based on token count.
});

export default emailRouter;