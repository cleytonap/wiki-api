# wiki-api

NodeJS web service (Restful API) with database integration (MongoDB Atlas).

The database used to store the data was the MongoDB Atlas (https://www.mongodb.com/atlas).

For security reasons, database username and password are read from environments variables (DB_USER and DB_PASSWORD).

The web service (NodeJS) was packaged into a container image and deployed to Google Cloud Run.

Tags:
  - NodeJS
  - MongoDB Atlas
  - mongoose
  - Javascritpt
  - Cloud Run
  - GCP (Google Cloud Platform)

## References:

How to Deploy a Node.js service to Cloud Run:
https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service

## API URL (endpoint deployed to GCP) :
https://wiki-api-cpgg55cmoa-uc.a.run.app/articles

## How to easily make requests to the wiki-api
Use https://www.postman.com/ 

## Simple Python application to make API requests

import requests

//Get all articles in the database

response = requests.get("http://localhost:8080/articles")

print(response.json())

//Add a new article into the database

response2 = requests.post("http://localhost:8080/articles", data={'title': 'python', 'content': 'content python'})

print(response2.text)

## Author: 
Cleyton Andre Pires (cleytonap)

https://github.com/cleytonap/

## Date:
02-Jun-2022

