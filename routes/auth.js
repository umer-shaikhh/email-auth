import express from "express";
const authRouter = express.Router();
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/connect/google/callback";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

authRouter.get("/email", (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send("Email is required.");
    }

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.readonly"],
      login_hint: email, // Passing the email as an input to google modal
    });

    res.redirect(authUrl);
  } catch (error) {
    res.status(400).send("Unsupported email provider");
  }
});

authRouter.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    // Store tokens securely for future use
    // Handle the authenticated user's email as needed
    res.status(200).send("Authentication successful!");
  } catch (error) {
    res.status(500).send("Authentication failed.");
  }
});

authRouter.post("/microsoft/callback", (req, res) => {
  // logic for microsoft callback
  res.end();
});

export default authRouter;
