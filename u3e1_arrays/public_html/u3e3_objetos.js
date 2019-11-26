/***
 * 
 Necesitamos almacenar en un programa todos los discos de música que tenemos en casa. Ahora
que sabemos crear nuestros propios objetos es el mejor modo de guardar esta información.
Crea un objeto “disco” que almacene la siguiente información:
■ Nombre del disco.
■ Grupo de música o cantante.
■ Año de publicación.
■ Tipo de música (podrá ser “rock”, “pop”, “punk” o “indie”);
■ Localización: almacenará un número de estantería.
■ Prestado: almacenará un valor booleano. Por defecto será false.
Además tendrá los siguientes métodos:
■ Un constructor sin parámetros (las 4 primeras propiedades serán cadenas vacías, la
localización será 0 por defecto y prestado estará a false).
 * 
 */

/**
 * @param {Object} disco
 * @returns {Disco}
 */
function Disco( disco ){
    
    var _disco = {
        'nombre': typeof disco.nombre === 'string' ? disco.nombre : '',
        'autor': typeof disco.autor === 'string' ? disco.autor : '',
        'genero': typeof disco.genero === 'string' ? disco.genero : Disco.Genero.Rock,
        'any': typeof disco.año === 'string' ? disco.año : '',
        'localizacion': typeof disco.localizacion === 'number' ? disco.localizacion : 0,
        'prestado': typeof disco.prestado === 'boolean' ? disco.prestado : false
    };
    
    this.nombre = ()=>{ return _disco.nombre; };
    this.autor = ()=>{ return _disco.autor; };
    this.genero = ()=>{ return _disco.genero; };
    this.any = ()=>{ return _disco.any; };
    this.localizacion = ()=>{ return _disco.localizacion; };
    this.prestado = ()=>{ return _disco.prestado; };
    
    return this;
}

Disco.Genero = {
    'Rock':'rock',
    'Pop':'pop',
    'Punk':'punk',
    'Indie':'indie'
};


var D = new Disco({
    'nombre':'Un dsco',
});

console.log(D);