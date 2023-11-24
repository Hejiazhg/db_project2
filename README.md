# CS5200 Database Management Project 2
## Hejia Zhang
## zhang.heji@northeastern.edu

## Required docs

1. Project2.pdf contains all the contents needed.
2. UML.png:  Class Diagram
3. ERD.png: Entity relationship diagram
4. customers_definition.json and restaurants_definition: definition for two collections
5. Project2.restaurants.json, Project2.restaurants.csv, Project2.customers.json, Project2.customers.csv : data exported from compass
6. Application folder: all the code of the node applications

## how to install
`cd ./Application`

`npm install`

## how to run
`node ./app.js`

open http://localhost:3000 with your browser

## main page

http://localhost:3000

## view restaurants page

http://localhost:3000/restaurants

## view customers page

http://localhost:3000/customers

## update restaurant page

http://localhost:3000/update-restaurant/:id

id will be replaced with restaurant id


## library used:
mongoose

express

body-parser

ejs