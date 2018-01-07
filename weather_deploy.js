const request = require('request');

var getWeather = (args) => {

    var loc = encodeURIComponent(args);

    request({

        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}`,
        json: true

    }, (error, response, body) => {

        if (body.status === 'OK') {

            var address = body.results[0].formatted_address;
            var latitude = body.results[0].geometry.location.lat;
            var longitude = body.results[0].geometry.location.lng;
            return 0;
            request({

                url: `https://api.darksky.net/forecast/2170ef3a8029c38ab1763679545f066a/${latitude},${longitude}`,
                json: true

            }, (error, response, body) => {

                if (response.statusCode === 200) {

                    var fahrenheit = body.currently.temperature;
                    var celsius = (fahrenheit - 32) * 5 / 9;
                    var summary = body.currently.summary;

                    var data = {
                        address: address,
                        temperature: celsius,
                        summary: summary
                    };
                    
                    return data;
                }

            });
        }
    });
};

module.exports = {
    getWeather
};
