/**
 * @returns {Meteo}
 */
(function () {

    var _meteo = {
        'key': '906a992f434bb3aca14ffb6ff41010fa',
        'api': 'https://api.openweathermap.org/data/2.5/weather',
        //'city_source': 'https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json',
        'city': 'Roma',
        'range': '5dies'
    };
    /** 
     * @param {String} city
     * @param {String} range
     * @returns {Meteo}
     */
    this.refresh = function () {

        var _self = this;

        jQuery.ajax(this.queryURL(_meteo.city , _meteo.range ), {
            'dataType': 'html'
        }).fail(function (error) {
            console.log('Error: ' + JSON.stringify(error));
        }).done(function (data) {
            console.log('Response: ' + typeof data);
            _self.capture(data);
        }).always(function () {
            console.log('Call completed');
        });

        return this;
    };
    /**
     * @param {String|JSON|HTML} response
     * @returns {Meteo}
     */
    this.capture = function (response) {

        if (response.length) {
            document.getElementById('output').innerHTML = response;
        } else {
            document.getElementById('output').innerHTML = '<p>Error</p>'
        }

        return this;
    };
    /**
     * @param {String} city 
     * @param {String} range 
     * @returns {String|URL}
     */
    this.queryURL = function (city,range) {

        

        return _meteo.api + '?q=' + city + '&mode=html&APPID=' + _meteo.key;
    };
    /**
     * @param {Array} cities
     * @returns {Meteo}
     */
    this.fillCities = function (cities) {

        var list = document.getElementById('location');

        for (var i = 0; i < cities.length; i++) {
            var option = document.createElement('option');
            option.value = cities[i];
            option.innerHTML = cities[i];
            list.appendChild(option);
        }
        return this;
    };
    this.importCities = function () {


        var _self = this;

        jQuery.ajax(_meteo.city_source, {
            'dataType': 'json',
            'beforeSend': function (xhr) {

            }
        }).fail(function (error) {
            console.log('Error: ' + error);
        }).done(function (data) {
            console.log('Response Type: ' + typeof data);
            if (typeof data === 'object' && Array.isArray(data)) {
                var input = [];
                data.forEach(function (city) {
                    if (city.hasOwnProperty('Name')) {
                        input.push(city.Name);
                    }
                });
                //console.log( input );
                _self.fillCities(input);
            }
        }).always(function () {
            console.log('Call completed');
        });

        return this;
    };
    this.templateDaily = function( data ){
        var item = jQuery('<li>');
        var container = jQuery('<div class="well well-sm text-center">');
        var date = jQuery('<b>');
        var image = jQuery('<img>');
        var weather = jQuery('<p>');
        var temp_max = jQuery('<p class="label label-warning"></p>');
        var temp_min = jQuery('<p class="label label-default"></p>');
        
        jQuery( date ).html( data.date );
        jQuery( temp_max ).html( data.temp_max );
        jQuery( temp_min ).html( data.temp_min );
        jQuery( image ).html( data.img );
        jQuery( weather ).html( data.weather );
        
        jQuery( container ).append(date);
        jQuery( container ).append(image);
        jQuery( container ).append(weather);
        jQuery( container ).append(temp_max);
        jQuery( container ).append(temp_min);
        jQuery( item ).append( container );

        jQuery('#16dies').append( item );
    };
    /**
     * @param {Object} data
     * @returns {scriptL#4}
     */
    this.templateHourly = function( data ){
        
        var item = jQuery('<li>');
        var container = jQuery('<div class="well well-sm text-center">');
        var time = jQuery('<b>');
        var image = jQuery('<img>');
        var weather = jQuery('<p>');
        var temp = jQuery('<p class="badge"></p>');
        
        jQuery( time ).html( data.time );
        jQuery( temp ).html( data.temp );
        jQuery( image ).html( data.img );
        jQuery( weather ).html( data.weather );
        
        jQuery( container ).append(time);
        jQuery( container ).append(image);
        jQuery( container ).append(weather);
        jQuery( container ).append(temp);
        jQuery( item ).append( container );

        jQuery('#5dies').append( item );
        
        return this;
    };
    /**
     * @returns {Meteo}
     */
    this.initialize = function () {

        var _self = this;

        jQuery(document).ready(function () {

            jQuery('.btn-group button').on('click', function (e) {
                e.preventDefault();

                _meteo.city = jQuery(this).html();
                
                _self.refresh();

                console.log( _meteo.city + ' selected');

                return true;
            });

            jQuery('a[data-toggle=tab]').on('click', function (e) {
                e.preventDefault();
                
                var range = jQuery(this).attr('href');
                
                _meteo.range = range.charAt(0) === '#' ? range.substr(1) : range;
                
                _self.refresh();

                console.log( _meteo.range + ' selected' );
                

                return true;
            });

        });
    };

    return this.initialize();
})(/*autorun*/);