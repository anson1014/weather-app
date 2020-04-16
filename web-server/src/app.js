const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
        name: 'Anson Chung',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anson Chung',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Anson Chung',
    });
});

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!',
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, response) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: response,
                    location,
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search!',
        });
    }
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help article note found.',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found.',
    });
});

app.listen(3000, () => {
    console.log('Serving is up on port 3000.');
});
