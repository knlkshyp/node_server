const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const weather = require('./weather_deploy.js');
var app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error)
            console.log('Unable to append file to server.log');
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Middleware

// View Engine

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

// View Engine

// app.get('/', (request, response) => {
//     response.send({
//         greet: 'Hi',
//         to: 'people'
//     });
// });


app.get('/', (request, response) => {
    response.render('home.hbs', {
        header: 'Home',
        greet: 'Welcome'
    });
});



app.get('/weather', (request, response) => {

    var data = weather.getWeather();
    data.address = 'bhopal';
    response.render('weather.hbs', {
        header: 'Weather',
        greet: 'Current weather',
        address: `${data.address}`,
        temperature: `${data.temperature}`,
        summary: `${data.summary}`,
    });

});

app.get('/about', (request, response) => {

    response.render('about.hbs', {
        header: 'About',
    });
});


app.listen(port, () => {
    console.log('Up');
});
