# miniblog
The purpose of this project is to demo how common features required by web apps can be implemented with GraphQL. This includes:
1. Querying data
2. Mutating / modifying data.
3. Paginating through data.
4. Authentication.
5. File uploads.
6. Realtime updates.


## This project uses:
1. Apollo server for the backend.
2. Apollo react for the client.

#### It also uses React hooks and GraphQL hooks in the client since hooks is what React projects will eventually move towards.

- The blog demonstrates how queries, mutations and pagination wih queries is done.
- The login page of course demonstrates how token authentication. Since this a demo it stores the AUTH cookie in local storage however you could also have it stored as a cookie via HTTP headers with the 'Secure' and 'HttpOnly' directives set.
- The chat page demonstrates the use of subscriptions. Note when you refresh the chat page you loose your chat history since it isn't saved in a database. It works like live chat. You see only what you’ve typed since you started the chat.
- The file upload page demonstrates how file uploads can be handled with GraphQL. For this feature too the backend does not store data but does return a response.

## Setup:
1. Clone to disk.
2. Run 'npm i && npm start' to install and fire up both client and server from their respective folders.
