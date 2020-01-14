


/**
 * @returns {AsociacionDeportiva}
 */
function AsociacionDeportiva( ){

    var _DB = {
        'socios':[]
    };
    
    /**
     * @param {Object} cuenta
     * @returns {Cuenta|Boolean}
     */
    this.crear = ( cuenta ) => {

        var socio = new Socio( cuenta );
        
        if( socio.valido() ){
          
            _DB.socios.push( socio );
        }

        return this.exportar();
    };
    /**
     * @param {String|Int} buscar
     * @returns {AsociacionDeportiva}
     */
    this.borrar = ( buscar ) => {
        
        _DB.socios.forEach( function( socio , idx ){
         
            if( socio.ID() == buscar || socio.DNI() == buscar ){
                
                localStorage.removeItem( socio.ID() );
                
                _DB.socios.splice( idx , 1 );
            }
        });
        
        return this;
    };
    /**
     * @param {String|Number} buscar
     * @returns {Socio|Boolean}
     */
    this.get = ( buscar ) => {
        
        var socios = this.listar( AsociacionDeportiva.Orden.Indice, buscar );
        
        return socios.length > 0 ? socios[0] : false;
    };
    /**
     * @param {String} buscar
     * @returns {Socio[]|Boolean}
     */
    this.listar = ( orden  , buscar ) =>{

        var resultado = [];

        if( typeof buscar === 'undefined' ){
            
            resultado = _DB.socios.slice();
        }
        else{
            //filtrar sobre todos los socios
            _DB.socios.forEach( function( datos ){
                //de base64 a JSON a Objeto
                var socio = new Socio( JSON.parse( atob( datos ) ) );

                if( buscar == socio.ID() ){
                    resultado.push( socio );
                }
                else{

                    switch( true ){
                        case socio.DNI() === buscar:
                        case socio.nombre() === buscar:
                        case socio.apellidos() === buscar:
                        case socio.localidad() === buscar:
                        case socio.categoria() === buscar:
                            resultado.push( socio );
                    }
                }
            });
        }
        
        //ordenar y exportar lista
        
        if( typeof orden === 'undefined' ){
            orden = AsociacionDeportiva.Orden.Indice;
        }
        
        switch( orden ){
            case AsociacionDeportiva.Orden.Alfabetico:
                return resultado.sort();
            case AsociacionDeportiva.Orden.Inverso:
                return resultado.reverse();
            default:
                return resultado;
        }
    };
    /**
     * @returns {Array|Object}
     */
    this.importar = () => {
        
        var importar = localStorage.getItem('socios');
        
        console.log( typeof importar );
        
        var buffer = atob( importar );
        
        console.log( buffer );
        
        return importar === 'string' && importar.length ? JSON.parse( buffer ) : [];
    };
    /**
     * @returns {AsociacionDeportiva}
     */
    this.exportar = ( ) => {
        
        var socios = [];
        
        _DB.socios.forEach( function( s ){
            
            socios.push( s.serializar() );
            
        } );
                
        if( serializado.length ){

            localStorage.setItem( 'socios' , socios );
        }
        
        return this;
    };
    /**
     * @returns {AsociacionDeportiva}
     */
    this.iniciar = () =>{

        var socios = this.importar();

        Object.keys(socios).forEach(function (key) {

            console.log(key);

            _DB.socios.push(new Socio(socios[key]));
        });
        
        return this;
    };
    
    return this.iniciar();
}
/**
 * @returns {AsociacionDeportiva}
 */
AsociacionDeportiva.Demo = () => {
    
    var ad = new AsociacionDeportiva();
    
    ad.crear({
        'id':1,
        'dni':'12312424D',
        'nombre': 'Pablo',
        'apellidos': 'Garcia',
        'localidad': 'Mahon',
        'fecha': (new Date('1994-05-02')).toISOString()
    }).crear({
        'id':2,
        'dni':'9876543R',
        'nombre': 'Tomas',
        'apellidos': 'Garriga',
        'localidad': 'Ciutadella',
        'fecha': (new Date('1992-08-11')).toISOString()
    }).crear({
        'id':3,
        'dni':'67908033D',
        'nombre': 'Francisco',
        'apellidos': 'Sintes',
        'localidad': 'Alaior',
        'fecha': (new Date('1994-03-25')).toISOString()
    }).crear({
        'id':4,
        'dni':'43123546T',
        'nombre': 'Jose',
        'apellidos': 'Pons',
        'localidad': 'Mahon',
        'fecha': (new Date('1993-02-01')).toISOString()
    }).crear({
        'id':5,
        'dni':'673555Y',
        'nombre': 'Alex',
        'apellidos': 'Pons',
        'localidad': 'Sant Climent',
        'fecha': (new Date('1995-12-17')).toISOString()
    });
    
    return ad;
};

/**
 * @type AsociacionDeportiva.Orden
 */
AsociacionDeportiva.Orden = {
    'Indice':'indice',
    'Alfabetico':'alfa',
    'Inverso':'inverso'
};
/**
 * @param {Object} cuenta 
 * @returns {Socio}
 */
function Socio( cuenta ){
    
    var _socio = {
        /**
         * @type Int
         */
        'ID': typeof cuenta.id === 'number' ? cuenta.id : 0,
        /**
         * @type String
         */
        'DNI': typeof cuenta.dni === 'string' ? cuenta.dni : '',
        /**
         * @type String
         */
        'nombre': typeof cuenta.nombre === 'string' ? cuenta.nombre : '',
        /**
         * @type String
         */
        'apellidos': typeof cuenta.apellidos === 'string' ? cuenta.apellidos : '',
        /**
         * @type Date
         */
        'fecha_nac': typeof cuenta.fecha === 'object' && cuenta.fecha instanceof Date ?
            //importar a pelo
            cuenta.fecha :
            //importar desde string
            typeof cuenta.fecha === 'string' ? new Date( cuenta.fecha ) : null,
        /**
         * @type String
         */
        'localidad': typeof cuenta.localidad === 'string' ? cuenta.localidad : ''
    };
    /**
     * @returns {String}
     */
    this.nombreCompleto = () => _socio.nombre + ' ' + _socio.apellidos;
    /**
     * @returns {String}
     */
    this.nombre = () => _socio.nombre;
    /**
     * @returns {String}
     */
    this.apellidos = () => _socio.apellidos;
    /**
     * @returns {Date}
     */
    this.fechaNaimiento = () => _socio.fecha_nac;
    /**
     * @returns {String}
     */
    this.localidad = () => _socio.localidad;
    /**
     * @returns {String}
     */
    this.DNI = () => _socio.DNI;
    /**
     * @returns {Number}
     */
    this.ID = () => _socio.ID;
    /**
     * @returns {String} 
     */
    this.categoria = () => {
        
        if( _socio.fecha_nac instanceof Date ){
            var year = (new Date()).getUTCFullYear() - _socio.fecha_nac.getUTCFullYear();

            switch( true ){
                case year < 10: return Socio.Categorizacion.BENJAMIN;
                case year < 12: return Socio.Categorizacion.ALEVIN;
                case year < 14: return Socio.Categorizacion.INFANTIL;
                case year < 16: return Socio.Categorizacion.CADETE;
                case year < 18: return Socio.Categorizacion.JUVENIL;
                case year >= 18: return Socio.Categorizacion.AFICIONADO;
            }
        }
        
        return '--Categor&iacute;a inv&acute;lida--';
    };
    /**
     * @returns {Boolean}
     */
    this.valido = (/**/) => _socio.ID > 0 &&
            _socio.DNI.length &&
            _socio.nombre.length &&
            _socio.apellidos.length &&
            _socio.fecha_nac instanceof Date &&
            _socio.localidad.length;
    /**
     * @returns {Object} 
     */
    this.exportar = () => {
        return {
            'id': _socio.ID,
            'dni': _socio.DNI,
            'nombre': _socio.nombre,
            'apellidos': _socio.apellidos,
            'localidad': _socio.localidad,
            'fecha': _socio.fecha_nac.toISOString()
        };
    };
    /**
     * @returns {String}
     */
    this.serializar = () => JSON.stringify( this.exportar( ) );
    
    return this;
}
/**
 * 
 * @type Categoria.Categorizacion
 */
Socio.Categorizacion = {
    BENJAMIN:'Benjamin',
    ALEVIN:'Alev&iacute;n',
    INFANTIL:'Infantil',
    CADETE:'Cadete',
    JUVENIL:'Juvenil',
    AFICIONADO:'Aficionado'
};




