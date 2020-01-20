/**
 * @returns {Elecciones}
 */
function Elecciones() {

    var _EL = {
        /**
         * @type Elecciones
         */
        'instance': this,
        'recuento': [/**/]
    };

    /**
     * @returns {Array}
     */
    this.listar = () => _EL.recuento;
    /**
     * @param {Object|Array} tabla
     * @returns {Elecciones}
     */
    this.importar = function (tabla) {

        if (typeof tabla === 'object') {
            for (var c in tabla) {
                if (_EL.recuento.hasOwnProperty(c) && Array.isArray(tabla[c])) {
                    for (var p in tabla[c]) {
                        if (_EL.recuento[c].hasOwnProperty(p) && tabla[c].hasOwnProperty(p)) {

                            _EL.recuento[c][p] = tabla[c][p];
                        }
                    }
                }
            }
        }

        return this;
    };
    /**
     * @param {String} colegio
     * @param {String} partido
     * @returns {Elecciones}
     */
    this.actualizar = function( colegio , partido , votos ){
       
        if( typeof _EL.recuento[ colegio ][ partido ] !== 'undefined' ){
            
            var antes = _EL.recuento[ colegio ][ partido ];
            
            _EL.recuento[ colegio ][ partido ] = typeof votos === 'number' ? votos : 0;
            //console.log( votos + ' votos actualizados en ' + colegio + ' de ' + partido );
            
            if( _EL.recuento[ colegio ][ partido ] != antes ){
                return this.guardar();
            }
        }
        
        return this;
    };
    /**
     * @param {String} colegio
     * @param {String} partido
     * @returns {Number}
     */
    this.resultado = function( colegio , partido ){
        
        return typeof _EL.recuento[ colegio ][ partido ] === 'number' ?
            _EL.recuento[ colegio ][ partido ] :
                0;
    };
    /**
     * @param {String} colegio
     * @returns {Number}
     */
    this.totalColegio = function( colegio ){

        var out = 0;

        if( typeof _EL.recuento[ colegio ] !== 'undefined' ){
            Object.keys( _EL.recuento[ colegio ] ).forEach( function( item ){
                out += _EL.recuento[ colegio ][ item ];
            });
        }
        
        return out;
    };
    /**
     * @returns {Number}
     */
    this.totalVotos = function(){
        
        var out = 0;
      
        Object.keys( _EL.recuento ).forEach( function( colegio ){
            Object.values( _EL.recuento[colegio] ).forEach( function( votos ){
                out += votos;
            });
        });
        
        return out;
    };
    /**
     * @param {String} partido
     * @returns {Number}
     */
    this.totalPartido = function( partido ){
        
        var out = 0;

        Object.values( _EL.recuento ).forEach( function( colegio ){
            if( typeof colegio[partido] !== 'undefined' ){
                out += colegio[ partido ];
            }
        });

        return out;
    };
    /**
     * Recuento de votos por colegio
     * @returns {Array}
     */
    this.resultadoPorColegio = function () {
        var out = [];
        
        Object.keys( Elecciones.Colegios ).forEach( function( centro ){
            
            out.push({
                'centro': Elecciones.Colegios[ centro ],
                'votos':_EL.instance.totalColegio( centro )});
            
        });
        
        return out;
    };
    /**
     * Recuento de votos por partido
     * @returns {Array}
     */
    this.resultadoPorPartido = function () {

        var out = [];
        
        Object.keys( Elecciones.Partidos ).forEach( function( partido ){
            out.push({
                'partido':Elecciones.Partidos[partido],
                'votos':_EL.instance.totalPartido( partido )});
        });
        
        return out;
    };
    /**
     * 
     * @returns {Elecciones}
     */
    this.guardar = function(){
        
        var items =  btoa( JSON.stringify(_EL.recuento) );

        localStorage.setItem( 'elecciones' , items );
     
        return this;
    };
    /**
     * @returns {Array}
     */
    this.cargar = function(){

        var datos = localStorage.getItem('elecciones');

        if( datos !== null ){
            
            var input = JSON.parse( atob( datos ) );
            
            return input;
        }
        return [];
    };
    /**
     * 
     * @returns {Elecciones}
     */
    this.demo = function(){
        
        Object.keys( _EL.recuento ).forEach( function( col ){
            Object.keys( _EL.recuento[ col ] ).forEach( function( par ){
                _EL.recuento[ col ][ par ] = parseInt( Math.random() * 10000 );
            } );
        });
        
        return this;
    };
    /**
     * @returns {Elecciones}
     */
    this.iniciar = function () {
        
        var importar = this.cargar();

        for (var c in Elecciones.Colegios) {

            _EL.recuento[ c ] = [];

            for (var p in Elecciones.Partidos) {
                
                _EL.recuento[ c ][ p ] = typeof importar[c] !== 'undefined' && importar[c][p] !== 'undefined' ?
                        importar[c][p] :
                                0;
            }
        }

        return this;
    };

    return this.iniciar().demo();
}
Elecciones.Colegios = {
    'claustre': 'Claustre',
    'verge-del-carme': 'Verge del Carme',
    'verge-de-gracua': 'Verge de Gracia',
    'sa-graduada': 'Sa Graduada'
};
Elecciones.Partidos = {
    'psoe': 'PSOE',
    'pp': 'PP',
    'ciudadanos': 'Ciudadanos',
    'podemos': 'Podemos',
    'mes': 'Mes'
};


