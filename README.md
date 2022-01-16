# Angular Template

This Angular app should help getting started with your idea without having to care about user authentication and registration. 
The template provides a simple angular app and a web server based on Express and the MongoDB database.

### Getting started

To get the project up and running you need to call the command in the /server folder and in the /client folder
```
npm install
```
Next you need to create a file in the /server folder called ```.env``` which contains the database name the server should connect to.
The ```.env``` file content should look like this:
```
DB_NAME=yourdatabasename
```
Now you can call ```npm start``` in the /server folder and ```ng serve``` in the /client folder and the app should be accessible under the
URL ```localhost:4200```

Feel free to customize the app the way you want.

### Versions used
- Node: v16.11.1
- Angular: v12.0.4
- npm: v6.14.15
