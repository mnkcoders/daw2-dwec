var Asociacion = [];
/**
 * 
 * @param {String} dni
 * @param {String} nombre
 * @param {String} apellidos
 * @param {String} localidad
 * @param {Date|String} fnc
 * @returns {Asociacion}
 */
Asociacion.crear = ( dni , nombre , apellidos , localidad , fnc , id ) => {

    if( typeof id === 'undefined' ){
        id = Asociacion.length + 1 ;
    }
    else if( typeof id === 'string' ){
        id = parseInt( id );
    }
    
    var nacimiento = fnc instanceof Date ? fnc.toISOString() : fnc;
    
    var socio = {
        'id':id,
        'nombre':nombre,
        'apellidos':apellidos,
        'dni':dni,
        'localidad':localidad,
        'fecha': nacimiento
    };
    
    socio.categoria = ( ) => {
            
            var nac = new Date( socio.fecha );
            
            var year = (new Date()).getUTCFullYear() - nac.getUTCFullYear();

            switch( true ){
                case year < 10: return Asociacion.Categorizacion.BENJAMIN;
                case year < 12: return Asociacion.Categorizacion.ALEVIN;
                case year < 14: return Asociacion.Categorizacion.INFANTIL;
                case year < 16: return Asociacion.Categorizacion.CADETE;
                case year < 18: return Asociacion.Categorizacion.JUVENIL;
                case year >= 18: return Asociacion.Categorizacion.AFICIONADO;
            }
            return 'Indefinido';
        };
        
    socio.display = () => socio.nombre + ' ' + socio.apellidos + ' (' + socio.categoria() + ')';
    
    Asociacion.push( socio );
    
    return Asociacion;
};
/**
 * @param {String|Object} filtro
 * @returns {Array}
 */
Asociacion.listar = ( filtro ) =>{
    
    var out = [];

    if( typeof filtro === 'object' ){
        var buscar = typeof filtro.buscar !== 'undefined' ? filtro.buscar : '';
        var localidad = typeof filtro.localidad !== 'undefined' ? filtro.localidad : '';
        var categoria = typeof filtro.categoria !== 'undefined' ? filtro.categoria : '';
        console.log( buscar );
        console.log( localidad );
        console.log( categoria );
        Asociacion.forEach( function( socio ){

            if( buscar.length === 0 || socio.nombre === buscar || socio.dni === buscar || socio.id == buscar ){
                if( localidad.length === 0 || ( socio.localidad === localidad ) ){
                    if( categoria.length === 0 || ( socio.categoria && socio.categoria() === categoria ) ){
                        out.push( socio );
                    }
                }
            }

        } );
    }
    else{
        out = Asociacion.slice();
    }
    console.log(out);
    
    return out;
};
/**
 * @param {String} buscar
 * @returns {Asociacion}
 */
Asociacion.borrar = ( buscar ) =>{
    
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
Asociacion.importar = () => {
    
    var db = localStorage.getItem('socios');
    
    if( db !== null ){
        var socios = JSON.parse( atob( db));
        if( Array.isArray(socios)){
            socios.forEach( function( socio ){
                Asociacion.crear(
                        socio.dni,
                        socio.nombre,
                        socio.apellidos,
                        socio.localidad,
                        socio.fecha,
                        socio.id
                        );
            });
        }
    }
    else{
        Asociacion.Demo().exportar();
    }
    
    return Asociacion;
};
Asociacion.exportar = () =>{
    
    localStorage.setItem( btoa( JSON.stringify( Asociacion.listar())) );
    
    return Asociacion;
};
/**
 * @returns {Asociacion}
 */
Asociacion.Demo = () => {
    Asociacion.crear(
            '12312424D',
            'Pablo',
            'Garcia',
            'Mahon',
            '1994-05-02'
    ).crear(
            '9876543R',
            'Tomas',
            'Garriga',
            'Ciutadella',
            '1992-08-11'
    ).crear(
            '67908033D',
            'Francisco',
            'Sintes',
            'Alaior',
            '1994-03-25'
    ).crear(
            '43123546T',
            'Jose',
            'Pons',
            'Mahon',
            '1993-02-01'
    ).crear(
            '673555Y',
            'Alex',
            'Pons',
            'Sant Climent',
            '1995-12-17'
    );
    
    return Asociacion;
};


/**
 * 
 * @type Categoria.Categorizacion
 */
Asociacion.Categorizacion = {
    BENJAMIN:'Benjamin',
    ALEVIN:'Alev&iacute;n',
    INFANTIL:'Infantil',
    CADETE:'Cadete',
    JUVENIL:'Juvenil',
    AFICIONADO:'Aficionado'
};

