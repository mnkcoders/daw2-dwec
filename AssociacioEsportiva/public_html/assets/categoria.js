/**
 * 
 * Crea un programa que sol·liciti al usuari el seu any de naixement i retorni la categoria a la que
pertany. Per això, apart de mostra el resultat, es mostrarà una llista amb les categories que
existeixen (Escolliu un esport de referència) marcant al usuari el resultat.

 * @returns {Categoria}
 */
function Categoria(){
    /**
     * @type Categoria
     */
    var _self = this;
    
    /**
     * @param {Number} year 
     * @returns {String}
     */
    this.categoria = function( year ){
        
        //var year = parseInt( fecha.replace('/').split('-')[0] );
        
        switch( true ){
            case year < 10: return Categoria.Categorizacion.BENJAMIN;
            case year < 12: return Categoria.Categorizacion.ALEVIN;
            case year < 14: return Categoria.Categorizacion.INFANTIL;
            case year < 16: return Categoria.Categorizacion.CADETE;
            case year < 18: return Categoria.Categorizacion.JUVENIL;
            case year >= 18: return Categoria.Categorizacion.AFICIONADO;
            default: return '--Categor&iacute;a inv&acute;lida--';
        }
    };
    /**
     * Por depurar y adaptar al formato input de todos los navegadores
     * @param {String} fecha
     * @returns {Number}
     */
    this.anys = function( fecha ){
        var year = parseInt( fecha.replace('/').split('-')[0] );
        var current = (new Date()).getFullYear();
        return current - year;
    };
    /**
     * @returns {Array}
     */
    this.listar = function(  ){
        var lista = [];
        for( var c in Categoria.Categorizacion ){
            if( Categoria.Categorizacion.hasOwnProperty(c)){
                lista.push( Categoria.Categorizacion[c]);
            }
        }
        return lista;
    };
    /**
     * 
     * @param {Number} year
     */
    this.display = function( year ){
        
        //var a = this.anys( year );
        
        var cat = this.categoria( (new Date()).getFullYear() - year );
        
        var output = this.listar().map( function( e ){
            return e === cat ? '<li class="collection-item remark bold">' + e + '</li>' : '<li class="collection-item">' + e + '</li>';
        });
        
        document.getElementById('cat_output').innerHTML = '<ul class="centered categorias collection">' + output.join('') + '</ul>';
        
        return this;
    };
    /**
     * 
     * @returns {Categoria}
     */
    this.reset = function(){
        
        return this;
    };
    /**
     * @returns {Categoria}
     */
    this.bind = function(){
        
        document.getElementById( 'cat_button').addEventListener( 'click' , function(e){

            e.preventDefault();
            
            _self.display( parseInt( document.getElementById('cat_fecha').value ) );
            
            return true;
        });
        
        console.log('Form Categoria inicializado');
        
        return this;
    };
    return this.bind();
}
/**
 * 
 * @type Categoria.Categorizacion
 */
Categoria.Categorizacion = {
    BENJAMIN:'Benjamin',
    ALEVIN:'Alev&iacute;n',
    INFANTIL:'Infantil',
    CADETE:'Cadete',
    JUVENIL:'Juvenil',
    AFICIONADO:'Aficionado'
};