var Asociacion = [];
/**
 * Agrega un socio a la lista, no lo crea
 * @param {String} dni
 * @param {String} nombre
 * @param {String} apellidos
 * @param {String} localidad
 * @param {Date|String} fnc
 * @param {Int} id
 * @returns {Asociacion}
 */
Asociacion.agregar = function( dni , nombre , apellidos , localidad , fnc , id ){

    var nacimiento = fnc instanceof Date ? fnc.toISOString( ) : fnc;
    
    var socio = {
        'id': id,
        'nombre': nombre,
        'apellidos': apellidos,
        'dni': dni,
        'localidad': localidad,
        'fecha': nacimiento,
        /**
         * @returns {String}
         */
        'categoria' : function(){

            var nac = new Date( this.fecha );

            var year = ( new Date( ) ).getUTCFullYear( ) - nac.getUTCFullYear( );

            switch( true ){
                case year < 10: return Asociacion.Categorizacion.BENJAMIN;
                case year < 12: return Asociacion.Categorizacion.ALEVIN;
                case year < 14: return Asociacion.Categorizacion.INFANTIL;
                case year < 16: return Asociacion.Categorizacion.CADETE;
                case year < 18: return Asociacion.Categorizacion.JUVENIL;
                case year >= 18: return Asociacion.Categorizacion.AFICIONADO;
            }
            
            return 'Indefinido';
        },
        /**
         * @returns {String}
         */
        'display': function( full ) {
            return typeof full === 'boolean' && full ?
                    this.nombre + ' ' + this.apellidos + ' (' + this.categoria() + ')' :
                    this.nombre + ' ' + this.apellidos;
        },
        /**
         * Muestra el número de socio en formato legible
         * @returns {String}
         */
        'displayId': function(){
            
            var out = this.id.toString();
            
            while( out.length < 4) out = '0' + out;
            
            return out;
        }
    };

    this.push( socio );
    
    return this;
};
/**
 * @returns {Array}
 */
Asociacion.localidades = function(){
    
    var out = [];
    
    this.forEach( ( socio ) => {
        if( !out.includes( socio.localidad ) ){
            out.push( socio.localidad )
        }
    } );
    
    return out;
};
/**
 * Crea y agrega un socio en la lista, lo guarda en memoria
 * @param {String} dni
 * @param {String} nombre
 * @param {String} apellidos
 * @param {String} localidad
 * @param {Date|String} fecha
 * @param {Function} callback
 * @returns {Asociacion}
 */
Asociacion.crear = function( dni , nombre , apellidos , localidad , fecha , callback ){
    
    this.agregar(
            dni ,  nombre ,
            apellidos ,  localidad ,
            fecha , this.length + 1 );

    if( typeof callback === 'function' ){
        callback( this.ultimo() );
    }

    return this.exportar();
};
/**
 * @returns {Boolean|Object}
 */
Asociacion.ultimo = function(){
    return this.length > 0 ? this[ this.length - 1 ] : false;
};
/**
 * @param {String|Int} ID
 * @returns {Int|Boolean}
 */
Asociacion.getIdx = function( ID ){
    
    for( var s = 0 ; s < this.length ; s++ ){
        if( this[ s ].id == ID ){
            return s;
        }
    }
    
    return false;
};
/** 
 * @param {String|Int} ID
 * @param {Object} datos
 * @param {Function} callback
 * @returns {Asociacion}
 */
Asociacion.actualizar = function( ID , datos , callback ){
    
    if( typeof datos === 'object' ){
        
        var idx = this.getIdx( ID );
        
        if( idx !== false ){

            var socio = this[ idx ];

            var actualizado = false;

            if( datos.nombre && datos.nombre !== socio.nombre ){
                socio.nombre = datos.nombre;
                actualizado = true;
            }
            if( datos.apellidos && datos.apellidos !== socio.apellidos ){
                socio.apellidos = datos.apellidos;
                actualizado = true;
            }
            if( datos.dni && datos.dni !== socio.dni ){
                socio.dni = datos.dni;
                actualizado = true;
            }
            if( datos.fecha && datos.fecha !== socio.fecha ){
                socio.fecha = datos.fecha;
                actualizado = true;
            }
            if( datos.localidad && datos.localidad !== socio.localidad ){
                socio.localidad = datos.localidad;
                actualizado = true;
            }
            if( actualizado ){
                this[ idx ] = socio;
                //console.log(socio);
                if( typeof callback === 'function' ){
                    callback( socio );
                }
                return this.exportar();
            }
        }
    }
    
    return this;
};
/**
 * @param {String|Object} filtro
 * @param {String} orden
 * @returns {Array}
 */
Asociacion.listar = function( filtro , orden ){
    
    var out = [  ];
    
    if( typeof filtro === 'object' ){
        filtro.buscar = filtro.buscar || '';
        filtro.localidad = filtro.localidad || '';
        filtro.categoria = filtro.categoria || '';
        
        //console.log( filtro );
        
        var db = this.slice();

        for( var s = 0 ; s < db.length ; s++ ){
            //saltar en función del valor de los filtros, o omitir si no hay filtro
            if( filtro.buscar.length > 0 && db[s].nombre !== filtro.buscar && db[s].dni !== filtro.buscar ) continue;
            if( filtro.localidad.length > 0 && db[s].localidad !== filtro.localidad ) continue;
            if( filtro.categoria.length > 0 && db[s].categoria() !== filtro.categoria ) continue;
            
            out.push(db[s]);
        }
    }
    else{
        //pillartodo al vuelo
        out = this.slice();
    }
    
    switch( orden || Asociacion.Orden.General ){
        case Asociacion.Orden.Alfabetico:
            return out.sort();
        case Asociacion.Orden.Inverso:
            return out.reverse();
    }
    
    return out;
};
/**
 * @param {String} buscar
 * @returns {Asociacion}
 */
Asociacion.borrar = function( buscar ){
    
    if( Number.isNaN( buscar ) ){
        //dni

    }
    else{
        //num socio
    }
    
    return Asociacion.exportar();
};
/**
 * @returns {Asociacion}
 */
Asociacion.importar = function(){
    
    var db = localStorage.getItem('socios');
    
    if( db !== null ){

        var socios = JSON.parse( atob( db));
        
        if( Array.isArray(socios)){
        
            //console.log( socios );
        
            socios.forEach( function( socio ){
            
                Asociacion.agregar(
                        socio.dni,
                        socio.nombre,
                        socio.apellidos,
                        socio.localidad,
                        socio.fecha,
                        socio.id );
            });
        }
    }
    else{
        this.Demo();
    }
    
    return this;
};
/**
 * @returns {Asociacion}
 */
Asociacion.exportar = function(){
    
    localStorage.setItem( 'socios',btoa( JSON.stringify( this.listar())) );
    
    return this;
};
/**
 * Crea varios socios de demo
 * @returns {Asociacion}
 */
Asociacion.Demo = function(){
    return this.agregar(
            '12312424D',
            'Pablo',
            'Garcia',
            'Mahon',
            '1994-05-02',
            1
    ).agregar(
            '9876543R',
            'Tomas',
            'Garriga',
            'Ciutadella',
            '1992-08-11',
            2
    ).agregar(
            '67908033D',
            'Francisco',
            'Sintes',
            'Alaior',
            '1994-03-25',
            3
    ).agregar(
            '43123546T',
            'Jose',
            'Pons',
            'Mahon',
            '1993-02-01',
            4
    ).agregar(
            '673555Y',
            'Alex',
            'Pons',
            'Sant Climent',
            '1995-12-17',
            5
    ).exportar();
};
/**
 * @type Asociacion.Categorizacion
 */
Asociacion.Categorizacion = {
    BENJAMIN:'benjamin',
    ALEVIN:'alevin',
    INFANTIL:'infantil',
    CADETE:'cadete',
    JUVENIL:'juvenil',
    AFICIONADO:'aficionado'
};
/**
 * @type Asociacion.Orden
 */
Asociacion.Orden = {
    'General': 'default',
    'Alfabetico': 'alpha',
    'Inverso': 'reverse',
};

