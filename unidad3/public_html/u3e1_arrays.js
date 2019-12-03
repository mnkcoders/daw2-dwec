/*
 EJERCICIO: u3e1_arrays
Vamos a gestionar una lista de países haciendo uso de Arrays.
Para ello necesitarás crear un archivo arrays.js que incluya las siguientes funciones:
■ Mostrar el número de elementos del array.
■ Mostrar todos los elementos del array.
■ Muestra los elementos del array en sentido inverso.
■ Muestra los elementos del array ordenados alfabéticamente (pero no los ordena).
■ Añadir un elemento al principio del array.
■ Añadir un elemento al final del array.
■ Borrar un elemento al principio del array (y decir cuál se ha borrado).
■ Borrar un elemento al final del array (y decir cuál se ha borrado).
■ Muestra el elemento que se encuentra en una posición que el usuario indica.
■ Muestra la posición en la que se encuentra un elemento que le indica el usuario.
■ Muestra los elementos que se encuentran en un intervalo que el usuario indica.
 */

var paises = [
    'España',
    'Francia',
    'Alemania',
    'Italia',
    'Reino Unido',
    'Polonia',
    'Republica Checa',
    'Dinamarca'
];



function mostrar( info ){
    
    document.getElementById('respuesta').innerHTML += '<p>' + info + '</p>';
}

mostrar( 'Tenemos '  + paises.length + ' paises en la lista');
mostrar( 'Estos son '  + paises.join(',') );
mostrar( 'Los giramos '  + paises.slice().reverse().join(',') );
mostrar( 'Los ordenamos sin mutar el original '  + paises.slice().sort().join(',') );
paises.unshift('Primer País');
mostrar( 'Agregamos algo al principio '  + paises.join(',') );
paises.push('Último País');
mostrar( 'Agregamos algo al final '  + paises.join(',') );
paises.shift();
mostrar( 'Quitamos algo del principio '  + paises.join(',') );
paises.pop();
mostrar( 'Quitamos algo del final '  + paises.join(',') );

var donde = Math.floor(Math.random() * paises.length);

mostrar( 'Mostramos un país en pla posición '
        + (donde+1) + ': '
        + paises[donde] );
mostrar( 'Mostramos una posición que ocupa '
        + paises[ donde ] + ': '
        + paises.indexOf(paises[ donde ]) );


mostrar( 'Mostramos una subselección de paises desde elsegundo hasta el 5'
        + paises.slice( 2, 5).join(',') );





