/**
 * Inicializa el control de navegación del efecto full-page-scroller
 * @param {int} animation_time
 * @returns {Navigator}
 */
function Navigator(animation_time) {

    var _self = this;

    var _elapsed = typeof animation_time === 'number' ?
            animation_time : 500;

    var _index = 0;

    var _sections = [];

    /**
     * Actualiza el índice según la sección seleccionada (modo link menu)
     * @param {string} section
     * @returns {Navigator._self|Navigator}
     */
    this.updateIndex = function (section) {

        if (section.substring(0, 1) === '#') {

            var element = section.substring(1, section.length);

            for (var i = 0; i < _sections.length; i++) {
                if (_sections[ i ] === element) {
                    _index = i;
                    break;
                }
            }
        }
        return _self;
    };

    /**
     * 
     * @param {string|array} section
     * @returns {Navigator._self|navigator|navigator._self}
     */
    this.registerSection = function (section) {

        if (typeof section === 'object') {

            var existing = false;

            for (var i = 0; i < section.length; i++) {
                for (var j = 0; j < _sections.length; j++) {
                    if (section[ i ] === _sections[ j ]) {
                        existing = true;
                    }
                }
                if (!existing) {
                    _sections.push(section[ i ]);
                }
            }
        } else {
            for (var i = 0; i < _sections.length; i++) {
                if (_sections[ i ] === section) {
                    return _self;
                }
            }
            _sections.push(section);
        }

        return _self;
    };
    /**
     * registrar automáticamente los IDs capturados desde el selector por clase
     * @param {String} class_name
     * @returns {Navigator._self|Navigator}
     */
    this.hookSections = function (class_name) {

        jQuery('.' + class_name).each(function () {

            _self.registerSection(jQuery(this).attr('id'));
        });

        return _self;
    };
    /**
     * 
     * @param {int|string} section_id
     * @returns {Navigator._self|navigator|navigator._self}
     */
    this.scrollTo = function (section_id) {

        var section;

        switch (typeof section_id) {
            case 'string':
                section = section_id;
                break;
            case 'number':
                section = '#' + _sections[ section_id ];
                break;
            default:
                return _self;
        }

        var section_top = jQuery(section).offset().top;

        jQuery('html, body').animate({scrollTop: section_top}, _elapsed);

        return _self;
    };
    /**
     * Extrae la lista de elementos
     * @returns {String}
     */
    this.dump = function () {
        return JSON.stringify(_sections);
    };
    /**
     * Indica el índice actual
     * @returns {Number}
     */
    this.getIndex = function () {
        return _index;
    };

    /**
     * Inicializar evento scroll
     * @returns {boolean}
     */
    jQuery(window).on('mousewheel', function (e) {

        if (e.originalEvent.wheelDelta < 0 && _index < _sections.length - 1) {
            _index++;
            _self.scrollTo(_index);
        } else if (e.originalEvent.wheelDelta > 0 && _index > 0) {
            _index--;
            _self.scrollTo(_index);
        }

        //console.log('Index: ' + _self.dumpIndex());

        //e.preventDefault();

        return false;
    });
    /**
     * Inicializar menú
     * @returns {undefined}
     */
    jQuery(".top-menu .item > a").on('click', function (e) {

        var target = jQuery(this).attr('href');

        _self.scrollTo(target);

        _self.updateIndex(target);

        //console.log('Index: ' + _self.dumpIndex());

        //e.preventDefault();

        return false;
    });
}
;

/**
 * Inicializar página
 * @type type
 */
jQuery(document).ready(function () {

    var _nav = new Navigator(580);

    /*_nav.registerSection( ['section-one',
     'section-two',
     'section-three',
     'section-four',
     'section-five'] );*/

    //Este es más cómodo :)
    _nav.hookSections('section');

    //console.log( _nav.dump() );

});
