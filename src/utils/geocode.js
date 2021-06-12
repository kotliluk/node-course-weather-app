const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia29sdWt5IiwiYSI6ImNrcHF0ZHdiaTNtYmMycHJpemgxMzB4ZDgifQ._JI_QoL_MKvi6HJKpYuWzg&limit=1'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('error in geocode connection', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('error in geocode location', undefined)
        }
        else {
            const {place_name, center} = response.body.features[0]
            callback(undefined, {location: place_name, latitude: center[1], longitude: center[0]})
        }
    })
}

module.exports = geocode