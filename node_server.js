const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

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

app.get('/about', (request, response) => {

    response.render('about.hbs', {
        header: 'About',
    });
});


app.listen(3000, () => {
    console.log('Up');
});
