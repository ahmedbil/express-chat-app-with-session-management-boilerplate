# Backend for Managing User Sessions and Application Acitvity.

Language: JavaScript

FrameWork: Express.js

Database: MongoDB

Session Management: JWT Tokens


Features Include:
 - User registration using unique username and a password
 - User login 
 - Web sockets to chat with other users


The backend is created using Express.js framework.
1. Clone the repository
2. Create a .env file in the root directory
3. Please enter the following information in the .env file:

ATLAS_URI = mongodb+srv://abilal:6Nui-ZdEz*27gdT@cluster0.kdhyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

ACCESS_TOKEN_SECRET=faa877ee5c98640ee2624cd59f8e35940178cef0d62e7acfb0606c299e033889ff8e3fbe56b879f6040270f93b68107b9343914a93b04ec6f0df5a682febe79d

REFRESH_TOKEN_SECRET=825dbbb25e31d931819bf913f4aba3a0e5f4431c4b11d8b9aba9d95641420e26a3b520b8821973a7d6c9a19af27f95677f2c9586686cf44aca5dc5009266a6b7

4. Requires node/nodemon and npm installed
5. Run npm install in the terminal for intalling all the dependencies
6. To start the server enter 'nodemon server,js' or 'node server.js'
