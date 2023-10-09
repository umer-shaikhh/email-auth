# Email API

## Overview

The Email API provides functionalities to connect with users' mailboxes, authenticate via OAuth2, check for new emails since a given timestamp, and calculate the hypothetical cost of processing emails using a model.

## Table of Contents

- [Architecture](#architecture)
- [Decisions Made](#decisions-made)
- [Challenges](#challenges)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Architecture

### Components:

1. **Authentication**: Uses OAuth2 to authenticate users with their email providers (Google and Microsoft).
2. **Email Retrieval**: Fetches emails since a given timestamp.

### Flow:

1. The user initiates an OAuth2 flow by providing their email.
2. Once authenticated, the user can query for new emails since a timestamp.

## Decisions Made

1. **OAuth2 for Authentication**: Chose OAuth2 due to its widespread adoption and security. It also provides a seamless experience for users.
2. **Express.js Framework**: Used Express.js for its simplicity, performance, and extensive middleware support.
3. **Modular Structure**: Adopted a modular directory structure to separate concerns, making the codebase scalable and maintainable.


## Getting Started to Run this Locally

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
