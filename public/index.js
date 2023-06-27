// Get the current page's URL
var currentPageURL = window.location.href;

// Example relative URL
var relativeURL = '/comments/all';

// Create a new URL object using the current page URL
var url = new URL(currentPageURL);

// Set the desired port number
var newPort = 8080;

// Update the port in the URL object
url.port = newPort;

// Resolve the absolute URL
var absoluteURL = url.origin + relativeURL;


fetch(absoluteURL)
    .then(response => console.log(response))
    .then (stuff => console.log(stuff))