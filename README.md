[![Build Status](https://travis-ci.com/girlking/PropertyPro.svg?branch=develop)](https://travis-ci.com/girlking/PropertyPro) [![Coverage Status](https://coveralls.io/repos/github/girlking/PropertyPro/badge.svg?branch=develop)](https://coveralls.io/github/girlking/PropertyPro?branch=develop)[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# PropertyPro

PropertyPro-lite is a web application that allows users (Agents or Customer ) to see posted property adverts which may be of different types such as mini-flats, 3 Bedrooms etc.
## Project management information on pivatal tracker

* See the project stories [here](https://www.pivotaltracker.com/n/projects/2354434).

## UI

The User interface is simple and intuitive.
![PropertyPro-lite screenshot](/UI/images/home.png?raw=true "Home page screenshot")

## User Interface (UI) Tech Stack (Frontend)

* HTML
* CSS
* Javascript

### GitHub Pages link for UI Frontend

[PropertyPro-lite/UI link for customer](https://girlking.github.io/PropertyPro/UI/all-apartment.html)
[PropertyPro-lite/UI link for agent](https://girlking.github.io/PropertyPro/UI/agent-dashboard.html)

### REST API Docs

[PropertyPro-lite documentation link](https://propertypro256.herokuapp.com/api/v1/api-docs/)


### Required Features

```
User can sign up.
User can sign in.
User (agent) can post a property advert
User (agent) can update detail of a property advert.
User (agent) can mark his/her posted advert as sold.
User (agent) can delete a property advert.
User can view all properties adverts.
User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
User can view a specific property advert.
```

## Installation and Running the Application

Ensure that you have nodejs and npm installed in your computer

a. Clone this repository into your named folder

```bash
git clone -b develop git@github.com:girlking/PropertyPro.git .
git status
```

b. Install the project dependencies

```bash
npm install
```

c. start the application

```bash
npm run dev
```

## Test the application

```bash
npm run test
```

## Test the endpoints

The application can be tested locally through localhost on port 3000 or through the online [link](https://propertypro256.herokuapp.com/) using postman

1. Run the application while postman is open
2. Go to postman and test against the endpoints below with the required property:-

### Endpoints to test

Method        | Endpoint      | Enable a user to: |
------------- | ------------- | ---------------
POST  | api/v1/auth/register  | Create user account  |
POST  | api/v1/auth/login  | Login a user |
POST  | api/v1/property-advert  | Create a property advert |
PATCH  | api/v1/property-advert/<:property-id>  | Update property data |
PATCH  | api/v1/property-advert/<:property-id>/sold  | Mark a property as sold so users know it’s no longer available |
DELETE  | api/v1/property-advert/<:property-id>  | Delete a property advert |
GET  | api/v1/property-advert/ | Get all property adverts |
GET  | api/v1/property-advert/search?type =​ propertyType  | Get all property advertisement offering a specific type of property (e,g flat, mini-flat,etc) |
GET  | api/v1/property-advert/<:property-id>  | View a specific property advert |

## Acknowledgements

* [Andela](https://andela.com/)

* [Google](https://google.com/)

## Author

* [Aprekuma Tamunoibi](https://github.com/girlking)

