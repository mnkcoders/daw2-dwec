/***
 * 
EJERCICIO: u3e4_objetos:
Carga en tu página el archivo de arrays que hicimos en la práctica anterior.
Crea un array vacío para almacenar los discos.
Cuando el usuario cargue la página, se cargarán las opciones:
■ Mostrar número de discos.
■ Mostrar listado de discos(y le preguntará si quiere mostrarlos en el orden que se encuentran
en el array, del revés u ordenados alfabéticamente).
■ Mostrar un intervalo de discos(y le pedirá que introduzca el intervalo en formato inicio-fin;
luego deberás extraer el valor inicio y fin).
■ Añadir un disco (y le preguntará si quiere añadir al principio o al final).
■ Borrar un disco (y le preguntará si quiere borrar al principio o al final).
■ Consultar un disco (y le preguntará si quiere consultar por posición o por nombre).
■ Todas las operaciones que se realicen se irán mostrando en la página con su título.
 * 
 */


/**
 * 
 * @param {String|Number} disco
 * @returns {Disco|Boolean}
 */
function consultar( disco ){
    
    switch( true ){
        case typeof disco === 'number':
            return COLECCION.length > disco ? COLECCION[disco] : false;
        case typeof disco === 'string':
            for( var d = 0 ; d < COLECCION.length ; d++ ){
                if( COLECCION[ d ].nombre === disco ){
                    return COLECCION[ d ];
                }
            }
            break;
    }
    return false;
}

/**
 * 
 * @param {Number} desde
 * @param {Number} hasta
 * @returns {Array}
 */
function intervalo( desde , hasta ){
    
    if( typeof desde !== 'number' ){
        desde = 0;
    }
    
    if( typeof hasta !== 'number' ){
        hasta = COLECCION.length - 1;
    }
    
    if( COLECCION.length <= desde && COLECCION.length > hasta ){
        return COLECCION.slice();
    }
}
/**
 * 
 * @param {type} disco
 * @returns {Array|COLECCION}
 */
function agregar( disco ){
    COLECCION.push(disco);
    
    return COLECCION;
}
/**
 * 
 * @param {type} disco
 * @returns {Array|COLECCION}
 */
function insertar( disco ){
    COLECCION.unshift( disco );
    return COLECCION;
}
/**
 * 
 * @returns {Array|COLECCION}
 */
function borrar_primero( ){
    COLECCION.shift();
    
    return COLECCION;
}
/**
 * 
 * @returns {Array|COLECCION}
 */
function borrar_ultimo( ){
    COLECCION.pop();
    return COLECCION;
}

/**
 * 
 * @param {Number} orden
 * @returns {Array|COLECCION}
 */
function listar_discos( orden ){
    
    if( typeof orden === 'undefined' ){
        orden = listar_discos.Orden.Ordenado;
    }
    
    switch( orden ){
        //case listar_discos.Orden.Ordenado: return COLECCION;
        case listar_discos.Orden.Invertido: return COLECCION.slice().reverse();
        case listar_discos.Orden.Alfabéticamente: return COLECCION.slice().sort();
    }
    
    return COLECCION;
}
/**
 * @type type
 */
listar_discos.Orden = {
    'Ordenado':0,
    'Invertido':1,
    'Alfabéticamente':2
};
/**
 * 
 * @param {Array|String} contenido
 * @param {String} titulo
 * @returns {undefined}
 */
function mostrar( contenido , titulo ){
    
    var out = document.getElementById('coleccion');
    
    out.innerHTML = '';
    
    if( typeof titulo !== 'undefined' ){
        out.innerHTML = '<h1>' + titulo + '</h1>';
    }
    
    switch( true ){
        case typeof contenido === 'undefined':
            break;
        case Array.isArray(contenido):
            out.innerHTML += '<ul class="coleccion">';
            contenido.forEach( function( item ){
                out.innerHTML += '<li>' + item.toString() + '</li>';
            });
            out.innerHTML += '</ul>';
            break;
        default:
            out.innerHTML += contenido;
    }
}

document.addEventListener('DOMContentLoaded',function(e){
    
    
    
    
});

