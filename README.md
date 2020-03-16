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

- The blog demonstartes how queries, mutations and pagination wih queries is done.
- The login page of course demonstrates authentication.
- The chat page demonstartes the use of subscriptions. Note when you refresh the chat page you loose your chat history since it isnt saved in a database.
- The file upload page demonstrates how file uploads can be handled with GraphQL. For this feature too the backend does not store data but does return a response.
