/**
 * @param {String} id 
 * @returns {Floristeria}
 */
function Floristeria( id ){
    
    var _F = {
        'instance':this,
        'id': id || 'ejercicio-4',
        /**
         * @type {Element}
         */
        'tabla':null,
        /**
         * @type {Element}
         */
        'contador': null
    };
    /**
     * @returns {Element}
     */
    this.contenedor = function(){ return document.getElementById( _F.id ); };
    /**
     * @param {Array} items
     * @returns {Element}
     */
    this.crearCabecera = function( items ){
           
        var fila = document.createElement('tr');
        
        if( Array.isArray( items ) ){

            items.forEach( function( item  ){
                var col = document.createElement('th');
                col.innerHTML = item;
                fila.appendChild(col);
            });
        }

        return fila;
    };
    /**
     * @param {Array} items
     * @returns {Element}
     */
    this.crearFila = function( items ){
           
        if( Array.isArray( items ) && items.length ){
                        
            var fila = document.createElement('tr');
    
            items.unshift( this.contarFlores( ) + 1 );
            
            console.log( items );

            for( var i = 0 ; i < items.length ; i++ ){
                
                var col = document.createElement('td');
                
                switch( i ){
                    case items.length - 1:
                        var img = document.createElement('img');
                        img.src = items[ i ];
                        col.appendChild( img );
                        break;
                    default:
                        col.innerHTML = items[ i ];
                        break;
                }
                
                fila.appendChild(col);
            }
            
            _F.tabla.appendChild( fila );
        }

        return this;
    };
    /**
     * @returns {Number}
     */
    this.contarFlores = function(){
        return _F.tabla.childNodes.length - 1;
    };
    /**
     * @returns {Array}
     */
    this.prompt = function(){
        
        var input = [];
        
        input.push( window.prompt( 'Nombre de la planta' ) );
        input.push( window.prompt( 'Ubicación' ) );
        input.push( window.prompt( 'Ejemplares' ) );
        input.push( window.prompt( 'URL imagen' ) );
        
        return input;
    };
    /**
     * @returns {Floristeria}
     */
    this.borrar = function(){
        
        if( _F.tabla.childNodes.length > 1 ){
            
            _F.tabla.removeChild( _F.tabla.childNodes[ _F.tabla.childNodes.length -1 ] );
        }
        
        return this;
    };
    /**
     * @returns {Floristeria}
     */
    this.actualizarContador = function(){
        
        _F.contador.innerHTML = this.contarFlores() > 0 ?
                '<b>' + this.contarFlores() + '</b> flores' :
                '<i>No hay flores que mostrar</i>';
        
        return this;
    };
    /**
     * @returns {Floristeria}
     */
    this.iniciar = function(){

        _F.tabla = document.createElement('table');
        
        _F.tabla.appendChild( this.crearCabecera( ['ID','nombre','ubicacion','ejemplares','flor'] ) );
        
        _F.contador = document.createElement('p');

        var agregar = document.createElement('button');
        agregar.type = 'button';
        agregar.className = 'btn btn-small';
        agregar.innerHTML = 'Agregar flor';
        agregar.addEventListener( 'click',function(e){
            e.preventDefault();
            _F.instance.crearFila( _F.instance.prompt( ) ).actualizarContador();
            return true;
        });
        
        var borrar = document.createElement('button');
        borrar.type = 'button';
        borrar.className = 'btn btn-small';
        borrar.innerHTML = 'Borrar ultimo';
        borrar.addEventListener( 'click',function(e){
            e.preventDefault();
            _F.instance.borrar();
            return true;
        });
        
        this.contenedor().appendChild( _F.tabla );
        this.contenedor().appendChild( _F.contador );
        this.contenedor().appendChild( agregar );
        this.contenedor().appendChild( borrar );
        
        return this.actualizarContador();
    };
    
    
    return this.iniciar();
}

