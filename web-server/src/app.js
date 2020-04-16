const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locationapp.set('views', viewPath)
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anson',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anson',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Anson',
    });
});

// app.com/weather
app.get('/weather', (req, res) => {
    res.send({
        location: 'Vancouver',
        temperature: '15',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help article note found.',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found.'
    })
})

app.listen(3000, () => {
    console.log('Serving is up on port 3000.');
});
