function Juez(){
    
    this.evaluar = function(  ){
        
        return true;
    };
    
    return this;
}

/**
 * @param {String} id
 * @returns {Escacs}
 */
function Escacs( id ){
    
    var _escacs = {
        'id': typeof id === 'string' && id.length ? id : 'escacs',
        'juego':{
            'turno':0,
            'jugador': 'Negro',
            'mueve': false
        },
        'estado': Escacs.Estado.Iniciando
    };
    
    var _juez = new Juez();
    
    /**
     * @returns {String}
     */
    this.id = () => '#' + _escacs.id;
    
    this.turno = function( id ){
        
        switch( true ){
            case _escacs.juego.mueve === false:
                var ficha = this.validarCasilla( id );
                if( this.validarFicha( ficha ) ){
                    //capturar la pieza que selecciona el jugador para mover
                    _escacs.juego.mueve = id;
                    this.notifica( _escacs.juego.jugador
                            + ' selecciona ' + ficha + ' - '
                            + this.nombrarCasilla(_escacs.juego.mueve) );
                }
                else{
                    this.notifica( _escacs.juego.jugador + ': selecciona una de tus piezas');
                }
                break;
            case typeof _escacs.juego.mueve === 'number':
                //evaluar el movimiento
                if( _juez.evaluar( _escacs.juego.mueve , id ) ){
                    var destino = this.validarCasilla( id );
                    this.notifica( _escacs.juego.jugador
                            + ' avanza sobre ' + destino + ' - '
                            + this.nombrarCasilla( id ) );
                    this.moverPieza(_escacs.juego.mueve , id );
                    //resetea y reinicia
                    this.siguienteTurno();
                }
                else{
                    this.notifica( _escacs.juego.jugador + ': no se admite ese movimiento');
                }
                break;
        }
    };
    /**
     * @returns {Escacs}
     */
    this.siguienteTurno = function(){
        
        _escacs.juego.mueve = false;
        
        _escacs.juego.jugador = _escacs.juego.jugador === 'Blanco' ?
                'Negro' :
                'Blanco';
        
        if( _escacs.estado < Escacs.Estado.Jugando ){

            _escacs.estado = Escacs.Estado.Jugando;
            this.notifica('Empieza ' + _escacs.juego.jugador );
            //console.log('--> Juega el ' + _escacs.juego.jugador );
        }
        
        return this;
    };
    /**
     * @param {Number} desde
     * @param {Number} hasta
     * @returns {Escacs}
     */
    this.moverPieza = function( desde , hasta ){
        
        var seleccion = jQuery( '.icon[data-cell='+desde+']' );
        var destino = jQuery( '.icon[data-cell='+hasta+']' );
        
        var pieza = jQuery( seleccion ).html();
        jQuery( destino ).html( pieza );
        jQuery( destino ).attr('data-id',jQuery(seleccion).attr('data-id'));
        jQuery( seleccion ).html('');
        jQuery( seleccion ).attr('data-id','');
        
        return this;
    };
    /**
     * @param {Number} id
     * @returns {String}
     */
    this.nombrarCasilla = function( id ){
        
        if( typeof id !== 'number' ){
            id = parseInt( id );
        }
        
        var letras = ['A','B','C','D','E','F','G','H'];

        var fila = parseInt( id / 8 );
        
        var columna = (id % 8) + 1;
        
        return letras[ fila ] + ':' + columna;
    };
    /**
     * @param {Number} id
     * @returns {String}
     */
    this.validarCasilla = function( id ){
        
        var casilla = jQuery('.icon[data-cell=' + id + ']');
        
        return jQuery( casilla ).attr('data-id');
    };
    /**
     * @param {String} ficha
     * @returns {Boolean}
     */
    this.validarFicha = function( ficha ){
        switch( _escacs.juego.jugador ){
            case 'Negro':
                for( var pieza in Escacs.Jugadores.Negro ){
                    if( ficha === Escacs.Jugadores.Negro[pieza] ){
                        return true;
                    }
                }
                break;
            case 'Blanco':
                for( var pieza in Escacs.Jugadores.Blanco ){
                    if( ficha === Escacs.Jugadores.Blanco[pieza] ){
                        return true;
                    }
                }
                break;
        }
        return false;
    };
    /**
     * @param {String} mensaje
     * @returns {Escacs}
     */
    this.notifica = function( mensaje ){

        jQuery('.notifier').html( mensaje );
        
        return this;
    };
    /**
     * @returns {Escacs}
     */
    this.crearTablero = () =>{
        
        var _self = this;
        
        var table = jQuery('<table class="tablero">');
 
        for( var i = 0 ; i < 8 ; i ++ ){
            var tr = jQuery('<tr>');
            for( var j = 0 ; j < 8 ; j++ ){
                var td = jQuery('<td>')
                var celda = jQuery('<span class="icon">');
                jQuery(celda).attr('data-cell', (i*8) + j );
                
                jQuery(celda).on('click',function(e){
                    e.preventDefault();
                    
                    if( _escacs.estado === Escacs.Estado.Jugando ){
                        
                        _self.turno( parseInt( jQuery(this).attr('data-cell') ) );
                        
                        return true;
                    }
                    
                    return false;
                });
                
                jQuery(td).append(celda);
                jQuery(tr).append(td);
            }
            jQuery(table).append(tr);
        }
        
        var notifier = jQuery('<h4 class="notifier">');
        
        jQuery( this.id() ).append( notifier );
        jQuery( this.id() ).append( table );
        
        return this;
    };
    /**
     * @returns {Escacs}
     */
    this.crearLayout = function(){
        
        jQuery('.icon').attr('data-id','');
        jQuery('.icon').html('');
        
        jQuery('.icon[data-cell=0]').html(Escacs.Pieza.Torre);
        jQuery('.icon[data-cell=0]').attr('data-id',Escacs.Jugadores.Blanco.Torre);
        jQuery('.icon[data-cell=1]').html(Escacs.Pieza.Caballo);
        jQuery('.icon[data-cell=1]').attr('data-id',Escacs.Jugadores.Blanco.Caballo);
        jQuery('.icon[data-cell=2]').html(Escacs.Pieza.Alfil);
        jQuery('.icon[data-cell=2]').attr('data-id',Escacs.Jugadores.Blanco.Alfil);
        jQuery('.icon[data-cell=3]').html(Escacs.Pieza.Rey);
        jQuery('.icon[data-cell=3]').attr('data-id',Escacs.Jugadores.Blanco.Rey);
        jQuery('.icon[data-cell=4]').html(Escacs.Pieza.Reina);
        jQuery('.icon[data-cell=4]').attr('data-id',Escacs.Jugadores.Blanco.Reina);
        jQuery('.icon[data-cell=5]').html(Escacs.Pieza.Alfil);
        jQuery('.icon[data-cell=5]').attr('data-id',Escacs.Jugadores.Blanco.Alfil);
        jQuery('.icon[data-cell=6]').html(Escacs.Pieza.Caballo);
        jQuery('.icon[data-cell=6]').attr('data-id',Escacs.Jugadores.Blanco.Caballo);
        jQuery('.icon[data-cell=7]').html(Escacs.Pieza.Torre);
        jQuery('.icon[data-cell=7]').attr('data-id',Escacs.Jugadores.Blanco.Torre);

        jQuery('.icon[data-cell=8]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=8]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=9]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=9]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=10]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=10]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=11]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=11]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=12]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=12]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=13]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=13]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=14]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=14]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        jQuery('.icon[data-cell=15]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=15]').attr('data-id',Escacs.Jugadores.Blanco.Peon);
        
        
        jQuery('.icon[data-cell=56]').html(Escacs.Pieza.Torre);
        jQuery('.icon[data-cell=56]').attr('data-id',Escacs.Jugadores.Negro.Torre);
        jQuery('.icon[data-cell=57]').html(Escacs.Pieza.Caballo);
        jQuery('.icon[data-cell=57]').attr('data-id',Escacs.Jugadores.Negro.Caballo);
        jQuery('.icon[data-cell=58]').html(Escacs.Pieza.Alfil);
        jQuery('.icon[data-cell=58]').attr('data-id',Escacs.Jugadores.Negro.Alfil);
        jQuery('.icon[data-cell=60]').html(Escacs.Pieza.Rey);
        jQuery('.icon[data-cell=60]').attr('data-id',Escacs.Jugadores.Negro.Rey);
        jQuery('.icon[data-cell=59]').html(Escacs.Pieza.Reina);
        jQuery('.icon[data-cell=59]').attr('data-id',Escacs.Jugadores.Negro.Reina);
        jQuery('.icon[data-cell=61]').html(Escacs.Pieza.Alfil);
        jQuery('.icon[data-cell=61]').attr('data-id',Escacs.Jugadores.Negro.Alfil);
        jQuery('.icon[data-cell=62]').html(Escacs.Pieza.Caballo);
        jQuery('.icon[data-cell=62]').attr('data-id',Escacs.Jugadores.Negro.Caballo);
        jQuery('.icon[data-cell=63]').html(Escacs.Pieza.Torre);
        jQuery('.icon[data-cell=63]').attr('data-id',Escacs.Jugadores.Negro.Torre);

        jQuery('.icon[data-cell=48]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=48]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=49]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=49]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=50]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=50]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=51]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=51]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=52]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=52]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=53]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=53]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=54]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=54]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        jQuery('.icon[data-cell=55]').html(Escacs.Pieza.Peon);
        jQuery('.icon[data-cell=55]').attr('data-id',Escacs.Jugadores.Negro.Peon);
        
        
        
        return this;
    };
    /**
     * @returns {Escacs}
     */
    this.iniciar = function(){
        
        var _self = this;

        jQuery( document ).ready( function( e ){
            //inicializar
            _self.crearTablero().crearLayout().siguienteTurno();
        } );
        return this;
    };
    
    
    return this.iniciar();
}

Escacs.Pieza = {
    'Rey': '&#9818;',
    'Reina': '&#9819;',
    'Torre': '&#9820;',
    'Alfil': '&#9821;',
    'Caballo': '&#9822;',
    'Peon': '&#9823;'
};

Escacs.Estado = {
    'Iniciando':0,
    'Jugando':1,
    'Finalizado':2
};

Escacs.Jugadores = {
    'Negro': {
        'Torre': 'torre-negra',
        'Caballo': 'caballo-negro',
        'Alfil': 'alfil-negro',
        'Peon': 'peon-negro',
        'Rey': 'rey-negro',
        'Reina': 'reina-negra'
    },
    'Blanco': {
        'Torre': 'torre-blanca',
        'Caballo': 'caballo-blanco',
        'Alfil': 'alfil-blanco',
        'Peon': 'peon-blanco',
        'Rey': 'rey-blanco',
        'Reina': 'reina-blanca'
    }
};

/**
 * @type Escacs
 */
Escacs.Juego = new Escacs();








