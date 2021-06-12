const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bcadc1a7892234bcb788dee7a2573a9f&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('error in forecast connection', undefined)
        }
        else if (response.body.error) {
            callback('error in forecast location', undefined)
            console.log(response.body)
        }
        else {
            const pred = response.body.current
            callback(undefined, `It is ${pred.temperature}, but it feels like ${pred.feelslike}.`)
        }
    })
}

module.exports = forecast