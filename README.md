# Email API

This project provides an API that connects to users' mailboxes (emails) and offers various functionalities related to email data.

## Features

- OAuth2 authentication with Google and Microsoft email providers.
- Check if a user has received at least one email since a given timestamp.
- Calculate the cost of processing emails from the last 24 hours using a hypothetical model.

## Getting Started

### Prerequisites

- Node.js (v13.2.0 or above)
- A Google Developer account with OAuth2 credentials set up.
- A Microsoft Azure account with OAuth2 credentials set up.

### Installation

1. Clone the repository:

\```bash
git clone https://github.com/umer-shaikhh/email-api.git
cd email-api
\```

2. Install the dependencies:

\```bash
npm install
\```

3. Create a `.env` file in the root directory and add your OAuth2 credentials:

\```env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
MICROSOFT_CLIENT_ID=YOUR_MICROSOFT_CLIENT_ID
MICROSOFT_CLIENT_SECRET=YOUR_MICROSOFT_CLIENT_SECRET
SESSION_SECRET=some_random_secret
\```

4. Start the server:

\```bash
npm start
\```

The server will start on `http://localhost:3000`.

## Usage

### Authenticate with Email Provider

To authenticate with an email provider, use the `/auth/connect` endpoint:

\```
GET /auth/connect?email=user@gmail.com
\```

The server will redirect to the appropriate OAuth flow based on the email domain.

### Check for New Emails

To check if a user has received new emails since a given timestamp:

\```
GET /email/search?since=timestamp
\```

### Calculate Email Processing Cost

To calculate the cost of processing emails from the last 24 hours:

\```
GET /email/cost
\```

## Testing

To run the test suite:

\```bash
npm test
\```
