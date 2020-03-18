/**
 * @returns {Meteo}
 */
(function () {

    var _meteo = {
        'key': '906a992f434bb3aca14ffb6ff41010fa',
        //'api': 'https://api.openweathermap.org/data/2.5/weather',
        'api': 'https://api.openweathermap.org/data/2.5/forecast',
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
        
        var daily_url = this.queryDailyForecast( _meteo.city , 15 );
        var hour_url = this.queryHourlyForecast( _meteo.city );

        _self.clear();

        jQuery.ajax( daily_url, {
            'dataType': 'html'
        }).fail(function (error) {
            console.log( daily_url );
            console.log('Error: ' + JSON.stringify(error));
        }).done(function (data) {
            console.log('Response: ' + typeof data + ' - ' + daily_url );

            var forecast = JSON.parse(data);

            if(  forecast.list && Array.isArray( forecast.list ) ){
            
                //console.log(forecast.list);
                
                forecast.list.forEach( function( item ){
                    
                    _self.templateDaily( item );

                }); 
            }
            //_self.capture( JSON.parse(  data ) );
        }).always(function () {
            console.log('Call completed');
        });

        jQuery.ajax( hour_url, {
            'dataType': 'html'
        }).fail(function (error) {
            console.log( hour_url);
            console.log('Error: ' + JSON.stringify(error));
        }).done(function (data) {

            console.log('Response: ' + typeof data + ' - ' + hour_url);
            var forecast = JSON.parse(data);

            if(  forecast.list && Array.isArray( forecast.list ) ){
            
                _self.listHourly( _self.groupDates( forecast.list ) );
            }
        }).always(function () {
            console.log('Call completed');
        });

        return this;
    };
    this.clear = function(){
        jQuery('#prediccio5dies').empty();
        jQuery('#prediccio16dies').empty();
        return this;
    };
    /**
     * @param {String|JSON|HTML} response
     * @returns {Meteo}
     */
    this.capture = function (response , target ) {
        
        console.log( response );
        
        if( target = '5dies' ){
             
             
        }
        else if( target = '16dies' ){
            
        }

        return this;
    };
    /**
     * @param {Object} input
     * @returns {Array}
     */
    this.groupDates = function( input ){
        
        var content = [];

        input.forEach(function (item) {

            var date = this.parseDate(item.dt);

            if (content.hasOwnProperty(date)) {
                content[date].push(item);
            } else {
                content[date] = [item];
            }
        });

        return content;
    };
    /**
     * @param {String} city
     * @returns {String}
     */
    this.queryHourlyForecast = function( city ){
        
        //http://api.openweathermap.org/data/2.5/forecast?q=London&appid=906a992f434bb3aca14ffb6ff41010fa
        return _meteo.api + '?q=' + city + '&appid=' + _meteo.key;
    };
    /**
     * @param {String} city
     * @returns {String}
     */
    this.queryDailyForecast = function( city , days ){
        if( !typeof days === 'number' ){
            days = 16;
        }
        //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}
        return _meteo.api + '/daily?q=' + city + '&cnt=' + days + '&appid=' + _meteo.key;
    };
    /**
     * @param {String} city 
     * @param {String} range 
     * @returns {String|URL}
     */
    this.queryURL = function (city,range) {

        //return _meteo.api + '?q=' + city + '&appid=' + _meteo.key;

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
    this.parseTime = function( ts ){
        
        var date = new Date( ts * 1000 );
        
        return date.getUTCHours() + 'h';
    };
    this.parseDate = function( ts ){
        var date = new Date( ts * 1000 );
        var format = [
            date.getUTCDate(),
            date.getUTCMonth() + 1,
            date.getUTCFullYear()
        ];
        return format.join('/');
    };
    this.templateDaily = function( data ){
        
        var item = jQuery('<li>');
        var container = jQuery('<div class="well well-sm text-center">');
        var date = jQuery('<b>');
        var image = jQuery('<img >');
        var weather = jQuery('<p>');
        var temp_max = jQuery('<p class="label label-warning"></p>');
        var temp_min = jQuery('<p class="label label-default"></p>');
        
        var input_date = this.parseDate(data.dt);
        var input_max = data.temp.max;
        var input_min = data.temp.min;
        var input_weather_icon = data.weather[0].icon;
        var input_weather_desc = data.weather[0].description;
        
        jQuery( date ).html( input_date );
        jQuery( temp_max ).html( input_max );
        jQuery( temp_min ).html( input_min );
        jQuery( image ).attr('src','http://openweathermap.org/img/w/'+input_weather_icon+'.png');
        jQuery( image ).attr('alt',input_weather_desc);
        jQuery( weather ).html( input_weather_desc );
        
        jQuery( container ).append(date);
        jQuery( container ).append(image);
        jQuery( container ).append(weather);
        jQuery( container ).append(temp_max);
        jQuery( container ).append(temp_min);
        jQuery( item ).append( container );

        jQuery('#prediccio16dies').append( item );
    };
    this.listHourly = function( data ){
        
        var _self = this;
        //console.log(data);
        for( var date in data ){
            //console.log( date );
            //console.log( forecast );
            //console.log( data[date] );
            //console.log( typeof data[date] );
            if( Array.isArray(data[date]) && data[date].length ){
                var display_date = jQuery('<h6>');
                var display_forecast = jQuery('<ul class="list-unstyled list-inline">');
                jQuery(display_date).html( date );
                data[date].forEach( function( forecast){
                    jQuery( display_forecast ).append( _self.templateHourly( forecast ) );
                });
                jQuery('#prediccio5dies').append( display_date );
                jQuery('#prediccio5dies').append( display_forecast );
            }
        }
    };
    /**
     * @param {Object} data
     * @returns {scriptL#4}
     */
    this.templateHourly = function( data ){
        console.log(data);
        var item = jQuery('<li>');
        var container = jQuery('<div class="well well-sm text-center">');
        var time = jQuery('<b>');
        var image = jQuery('<img>');
        var weather = jQuery('<p>');
        var temp = jQuery('<p class="badge"></p>');
        
        var input_time = this.parseTime( data.dt );
        var weather_icon = data.weather[0].icon;
        var weather_desc = data.weather[0].description;
        var input_temp = data.main.temp;
        
        jQuery( time ).html( input_time );
        jQuery( temp ).html( input_temp );
        jQuery( image ).attr('src','http://openweathermap.org/img/w/'+weather_icon+'.png');
        jQuery( image ).attr('alt', weather_desc );
        jQuery( weather ).html( weather_desc );
        
        jQuery( container ).append(time);
        jQuery( container ).append(image);
        jQuery( container ).append(weather);
        jQuery( container ).append(temp);
        jQuery( item ).append( container );

        //jQuery('#prediccio5dies > ul').append( item );
        
        return item;
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