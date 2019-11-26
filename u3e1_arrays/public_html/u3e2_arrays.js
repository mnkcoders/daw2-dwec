/**
 * 
 EJERCICIO: u3e2_arrays:
Ten en cuenta que el array será una variable global y que se pasará por parámetro en todas las
funciones.
Cuando el usuario cargue la página, se cargará un prompt donde se mostrarán (en el prompt, no en
la página) las opciones:
■ Mostrar número de países.
■ Mostrar listado de países (y le preguntará si quiere mostrarlos en el orden que se
encuentran en el array, del revés u ordenados alfabéticamente).
■ Mostrar un intervalo de países (y le pedirá que introduzca el intervalo en formato inicio-fin;
luego deberás extraer el valor inicio y fin).
■ Añadir un país (y le preguntará si quiere añadir al principio o al final).
■ Borrar un país (y le preguntará si quiere borrar al principio o al final).
■ Consultar un país (y le preguntará si quiere consultar por posición o por nombre).
■ Todas las operaciones que se realicen se irán mostrando en la página con su título.
 * 
 */

function mostrar( info ){
    
    document.getElementById('respuesta').innerHTML += '<p>' + info + '</p>';
}

var array = [];


document.addEventListener('DOMContentLoaded', e => {
    
    var contar_paises = window.confirm('Mostrar numero de paises?');
    
    var listar_paises = window.confirm('Listar paises?');
    
    if( listar_paises ){
        window.confirm('alfabeticamente')
    }
    
});





