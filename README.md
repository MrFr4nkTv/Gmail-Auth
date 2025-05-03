# README.md

## Gmail Authentication App

This project is a simple web application that allows users to authenticate using their Gmail accounts. After successful authentication, users are redirected to the main application, and their session data, including tokens and user information, is stored in a local database.

### Features

- OAuth 2.0 authentication with Gmail
- User session management
- Local database storage for user data
- Middleware for route protection

### Project Structure

```
gmail-auth-app
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   └── app.ts
├── public
│   ├── css
│   └── js
├── views
│   ├── auth
│   └── index.html
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd gmail-auth-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables.

### Usage

To start the application, run:
```
npm start
```

Visit `http://localhost:3000` in your browser to access the application.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.