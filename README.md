# Dynamic API host

This is a Bun.js project that provides a web server with various routes and functionality, including user authentication, registration, logout, home routes, and API routes. It uses MongoDB as the database and includes HTTPS support.

## Installation
```bash
git clone https://github.com/NGamerHere/dynamic-api-host.git
```

## For installation of dependencies

```bash
bun install
```
Create a .env file in the root directory with the following variables:

```bash
PORT=3000 # or any other desired port
DBUSERNAME=your-mongodb-username
DBPASSWORD=your-mongodb-password
EMAIL_USERNAME=your-email-username
EMAIL_PASSWORD=your-email-password
sessionKey=your-session-key
```
sessionKey can be any random string of characters.
Replace the placeholders with your actual values

Obtain the necessary SSL/TLS certificates (ca_bundle.crt, certificate.crt, and private.key) and place them in the project root directory.

To run:

```bash
bun run index.ts
```

The HTTPS server will start running on port 3000 (or the port specified in your .env file).

## Usage
  
  you can add the api routes by going to the /addApi route


 after logging in you can access the API routes at https://localhost:3000/your-username/

 when the api is public, you can access the API routes at https://localhost:3000/your-username/routeName

 when the api is private, you can access the API routes at https://localhost:3000/your-username/routeName?key=key
 that private key was going to be send to the user after the creation of the api via email

## contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/)



This project was created using `bun init` in bun v1.0.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
