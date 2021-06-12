const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// vytvoreni serveru
const app = express();
const port = process.env.PORT || 3000;

// zadani public slozky pro frontend - index.html se pristupuje defaultne na domain.com, ostatni file.html musi byt domain.com/file.html
// v public slozce se tvori normalne fronted html, css, js...
const publicDir = path.join(__dirname, '../public');
// views je default, zde se da zmenit na jakykoli adresar
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// nastaveni ze pouzivame hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath, () => {});

// static = public assets se nemeni, adresar se static strankami
app.use(express.static(publicDir));

app.get('', (req, res) => {
    // pro renderovani dynamickych stranek treba s hbs
    // druhy parametr je objekt s definovanymi promennymi pro pouziti v index.hbs
    res.render('index', {
        title: 'Weather App'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help for Weather App',
        helpText: 'No help for you noob'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided...'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                address: req.query.address,
                location,
                forecast
            });
        });
    });
});

app.get('/products', (req, res) => {
    // kontrola, ze req obsahuje pozadovane query params
    if (!req.query.search) {
        return res.send({  // nemuze se odpovedet na jeden request dvakrat - return
            error: 'No search term provided...'
        });
    }
    // req.query obsahuje query parametry (key=value z url)
    console.log(req.query)
    // to co odesleme takto primo jako string, se zobrazi jako page content
    // odeslany JSON se automaticky stringifies
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        errorText: 'Help article not found'
    });
});

// match vsechno dalsi - misto default 404 chyby
// musi byt posledni pridany app.get
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        errorText: 'Page not found'
    });
});

// start serveru na portu 3000
app.listen(port, () => {
    console.log("server is on port " + port);
});