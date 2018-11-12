# Project 7: My Neighborhood Map

## Table of Contents
* [Overview](##Overview)
* [Specifications](##Specifications)
* [Installation](##Installation)
* [Dependencies](##Dependencies)
* [Attribution](##Credits)
* [Helpful Links](##Helpful)

## Overview
This project is for the Front End Web Developer Nanodegree for Udacity. It is the final project which showcases everything we have learned in this program. This project is made from scratch using React. It is a single page map application that uses Google Maps API and integrated a third-party data API which is usable offline and is accessible. 

I have set the location of this app in my current city of Las Vegas, NV. Users are able to filter through restaurants in the city.

## Specifications
* Interface Design
  * Application is responsive
  * Usable across modern device browsers and desktops

* Application Functionality
  * App is able to filter locations/markers using an input field
  * There should be a list of locations in which the filter is applied to
  * Clicking a location displays information about it
  * Map displays location markers by default
  * Error free

* Asynchronous Data Usage
  * Application utilizes Google Maps API and at least one non-Google third-party API
  * All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest
  * Error handling is graceful using common fallback techniques

* Documentation
  * README file is included which details steps on how to run the application
  * Comments are present and explain longer pieces of code

* Location Details Functionality
  * Additional data about locations is provided and sourced from a third party API
  * Error free
  * Presented in a usable and responsive manner

* Accessiblity
  * Focus is appropriately managed. Allowing users to tab through important elements
  * Site elements are defined semantically
  * Images have alternative text that describe the content of the image

* Offline Use
  * When available in the browser, the site uses a service worker to cache
responses to requests for site assets. Visited pages are rendered when there is
no network access.

* Application Architecture
  * Proper use of React
  * State control is managed appropriately

## Installation

* Download or clone the repository in your computer
* Install all project dependencies with `npm install` or `yarn add`
* Navigate to the project directory and start the server with `npm start` or `yarn start`
* Open http://localhost:3000 in the browser to view the app

## Dependencies
Project is generated with `create-react-app`, which includes React and ReactDOM as dependencies.

Other dependencies:
```
npm install axios --save
npm install react-google-maps --save 
```

## Credits

* [Google Maps API](https://cloud.google.com/maps-platform/) - Used to get locations for the app
* [FourSquare API](https://developer.foursquare.com/places-api) - 3rd party API used to get photos and other details of the venue
* [IMG Placeholder](https://imgplaceholder.com) - provided image placeholder for locations that did not have photos
* [Snazzy Maps](https://snazzymaps.com/) - used to style the google map element

## Helpful Links

* [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/tutorial)
* [FourSquare API Documentation](https://developer.foursquare.com/docs)
* [W3Schools.com](https://www.w3schools.com/default.asp)
* [Ryan Waite - Walkthrough & Complete Guide](https://youtu.be/LvQe7xrUh7I)
* [Yahya Elharony - Neighborhood Map Project Explained Playlist](https://www.youtube.com/playlist?list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1)
* [Forest Walker - Neighborhood Map Playlist](https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)

