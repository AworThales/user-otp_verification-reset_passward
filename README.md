# Login System with password reset system and verification

Hello everyone, In this project, we are going to create **This App with Login System**. 
In this app we are going to create login, registration, profile, reset password routes and learn
how to send Mail from the Node.js backend application.

## Working with the Project

Download this project from above link. Create two configaration files into the project.
First in the client and second in the server.

In the Client Folder create .env file and put this code inside it.

.env
```
REACT_APP_SERVER_DOMAIN='<server_domain>' # example 'http://localhost:8080'
```


After that create a file in the Server Folder with the name config.js and put the below code inside it.

config.js
```
export default {
    JWT_SECRET : "<secret>",
    EMAIL: "", // testing email & password
    PASSWORD : "",
    ATLAS_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Note:** The **ATLAS_URI** is important to work this project.

Then, create all these variables in the project and make sure you set ATLAS_URI variable.
Otherwise, the project will not response.