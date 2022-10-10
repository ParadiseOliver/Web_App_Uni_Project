# Web App Uni Project - Trampoline Coach Reviews

Uni Project: Development of a cloud hosted website incorporating a Node.js server and REST API using JSON.

I built a web app where users could add reviews and ratings of trampoline coaches (fictional of course).

Reviews were stored as JSON and could be retrieved using the REST API built with Node.js

There is also an admin page where new coaches could be added for review if you had the authentication Access Token.

The API contained five routes: GET /people to get a list of coaches, GET /people/:username to get a given coach, GET /reviews to get all reviews, 
POST /people to add a new coach and POST /review to create a new review. (No delete or update capabilities were required for the project so were not built).
