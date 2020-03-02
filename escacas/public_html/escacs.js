/**
 * @param {String} id
 * @returns {Escacs}
 */
function Escacs( id){
    
    var _escacs = {
        'this': this,
        'id': typeof id === 'string' && id.length ? id : 'escacs'
    };
    /**
     * @returns {String}
     */
    this.id = () => '#' + _escacs.id;
    
    this.crearTablero = () =>{
        
        var table = jQuery('<table class="tablero">');
 
        for( var i = 0 ; i < 8 ; i ++ ){
            var tr = jQuery('<tr>');
            for( var j = 0 ; j < 8 ; j++ ){
                var td = jQuery('<td>')
                var celda = jQuery('<span class="icon">');
                jQuery(celda).attr('data-id', (i*8) + j );
                jQuery(td).append(celda);
                jQuery(tr).append(td);
            }
            jQuery(table).append(tr);
        }
        
        jQuery( this.id() ).append( table );
    };
    /**
     * @returns {Escacs}
     */
    this.iniciar = function(){

        jQuery( document ).ready( function( e ){
            //inicializar
            _escacs.this.crearTablero();

        } );
        return this;
    };
    
    
    return this.iniciar();
}
/**
 * @type Escacs
 */
Escacs.Juego = new Escacs();








