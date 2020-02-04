/**
 * @param {Number} nivel 
 * @returns {BuscaMinas}
 */
function BuscaMinas( nivel ) {

    var _BM = {
        /**
         * @type Array
         */
        'celdas': [],
        'nivel': nivel || BuscaMinas.Nivel.Novato,
        'tablero': {
            'rows': nivel || BuscaMinas.Nivel.Novato,
            'cols': nivel || BuscaMinas.Nivel.Novato,
            'minas': 0,
            'puntos': 0
        },
        /**
         * @type Int
         */
        'status': BuscaMinas.Estado.Iniciado
    };
    /**
     * @returns {Number}
     */
    this.estado = () => _BM.status;
    /**
     * @returns {Number}
     */
    this.nivel = () => _BM.nivel;
    /**
     * @returns {Object}
     */
    this.tablero = () => _BM.tablero;
    /**
     * @param {Number} id
     * @returns {Number|Boolean}
     */
    this.getUp = function (id) {

        return id > _BM.nivel - 1 ? id - _BM.nivel : false;
    };
    /**
     * @param {Number} id
     * @returns {Number|Boolean}
     */
    this.getDown = function (id) {

        return parseInt(id / _BM.nivel) < (_BM.nivel - 1) ?
                id + _BM.nivel :
                false;
    };
    /**
     * @param {Number} id
     * @returns {Boolean|_BM.celdas}
     */
    this.getLeft = function (id) {

        return id % _BM.nivel > 0 ? id - 1 : false;
    };
    /**
     * @param {Number} id
     * @returns {Boolean|_BM.celdas}
     */
    this.getRight = function (id) {

        return id % _BM.nivel < _BM.nivel - 1 ? id + 1 : false;
    };
    /**
     * @param {Int} id
     * @returns {Boolean}
     */
    this.activar = function (id) {

        if (this.explorar(id)) {
            _BM.status = BuscaMinas.Estado.Perdido;
            return true;
        }
        
        _BM.tablero.puntos++;
        
        if( _BM.tablero.puntos >= _BM.celdas.length - _BM.tablero.minas  ){
            _BM.status = BuscaMinas.Estado.Ganado;
        }

        false;
    };
    /**
     * @param {type} id
     * @returns {Boolean}
     */
    this.explorar = function (id) {

        return id >= 0 && id < _BM.celdas.length ?
                _BM.celdas[ id ] :
                false;
    };
    /**
     * Revela celdas adjuntas
     * @param {Number} x
     * @param {Number} y
     * @returns {Boolean}
     */
    this.revelar = function (x, y) {

        return this.explorar((y * _BM.nivel) + x);
    };
    /**
     * @param {Number} id
     * @returns {Number}
     */
    this.contarMinas = function( id ){
        
        var contador = 0;
        var col = parseInt(id) % _BM.nivel;
        var row = parseInt(id / _BM.nivel);
        console.log( col + ':' + row);
        for( var x = col - 1 ; x < col + 2 ; x++ ){
            //contar fila syperior e inferior
            contador += this.revelar( x , row - 1 ) ? 1 : 0;
            contador += this.revelar( x , row + 1 ) ? 1 : 0;
        }
        //contar laterales
        contador += this.explorar( id - 1 ) ? 1 : 0;
        contador += this.explorar( id + 1 ) ? 1 : 0;
        console.log( contador );
        return contador;
    };
    /**
     * @returns {Boolean[]}
     */
    this.celdas = function () {return _BM.celdas; };
    /**
     * @returns {Number}
     */
    this.minas = () => _BM.tablero.minas;
    /**
     * 
     * @returns {BuscaMinas}
     */
    this.crear = function ( ) {

        _BM.status = BuscaMinas.Estado.Iniciado;

        //var N = _BM.tablero.cols * _BM.tablero.rows;
        //var M = _BM.tablero.cols;
        _BM.tablero.minas = _BM.nivel;

        for( var x = 0 ; x < _BM.nivel ; x++ ){
            var M = parseInt( Math.random() * _BM.nivel );
            for( y = 0 ; y < _BM.nivel ; y++ ){
                _BM.celdas.push( M === y );
            }
        }

        _BM.status = BuscaMinas.Estado.Jugando;
        
        console.log('Minas ' + this.minas()) ;
        console.log('Celdas ' + _BM.celdas.length ) ;
        console.log('Nivel ' + _BM.nivel ) ;
        console.log('Estado ' + _BM.status ) ;

        return this;
    };

    return this.crear( );
}
/**
 * 
 */
BuscaMinas.Estado = {
    'Iniciado': 0,
    'Jugando': 1,
    'Ganado': 2,
    'Perdido': 3
};
BuscaMinas.Nivel = {
    'Novato': 6,
    'Principiante': 8,
    'Intermedio': 10,
    'Avanzado': 12
};
(function () {

    var _GAME = {
        /**
         * @returns {scriptL#143}
         */
        'this': this,
        /**
         * 
         * @returns {BuscaMinas}
         */
        'logica': null
    };
    /**
     * @param {String} texto
     * @param {String} tipo
     * @returns {scriptL#143.notificar}
     */
    function notificar( texto , tipo ){
        
        if( typeof tipo === 'undefined' ){
            tipo = notificar.Tipo.Informacion;
        }
        
        var msgbox = document.getElementById('notificador');
        
        msgbox.innerHTML = texto;
        msgbox.className = 'message ' + tipo;
    }
    /**
     * 
     */
    notificar.Tipo = {
        'Informacion':'info',
        'Confirmacion':'success',
        'Aviso':'advice',
        'Alerta':'warning',
        'Error':'error'
    };
    /**
     * Mostrar la celda en el tablero
     * @param {Number} id
     * @returns {indexL#137}
     */
    this.descubrir = function (id, marcar ) {

        document.getElementById('id-' + id).classList.add('show');
        
        if( _GAME.logica.explorar( id ) ){
            document.getElementById('id-' + id).classList.add('mine');
        }
        
        if( typeof marcar !== 'undefined' && marcar > 0 ){
            document.getElementById('id-'+id).innerHTML = marcar;
        }

        return this;
    };
    /**
     * 
     * @param {Number} id
     * @returns {indexL#137}
     */
    this.activar = function (id) {

        console.log('Activando ' + id);

        if (!_GAME.logica.activar(id)) {

            //no hay mina!
            var cerca = _GAME.logica.contarMinas( id );
            this.descubrir(id , cerca );
            //explorar alrededor!
            var up = _GAME.logica.getUp(id);
            var down = _GAME.logica.getDown(id);
            var left = _GAME.logica.getLeft(id);
            var right = _GAME.logica.getRight(id);
            if (up !== false && !_GAME.logica.explorar(up)) {
                //descrubrir mina encima
                this.descubrir(up);
                _GAME.logica.activar( up );
            }
            if (down !== false && !_GAME.logica.explorar(down)) {
                //descrubrir mina debajo
                this.descubrir(down);
                _GAME.logica.activar( down );
            }
            if (left !== false && !_GAME.logica.explorar(left)) {
                //descrubrir mina iqzuierda
                this.descubrir(left);
                _GAME.logica.activar( left );
            }
            if (right !== false && !_GAME.logica.explorar(right)) {
                //descrubrir mina derecha
                this.descubrir(right);
                _GAME.logica.activar( right );
            }
            
            if( cerca ){
                notificar( cerca + ' minas cerca!' );
            }
        }

        return this.update();
    };
    /**
     * 
     * @returns {scriptL#184}
     */
    this.revelar = function(){
        document.querySelectorAll('.celda').forEach(item => {
            var id = item.getAttribute('data-id');
            if (_GAME.logica.explorar(parseInt(id))) {
                item.classList.add('show', 'mine');
            } else {
                item.classList.add('show');
            }
        });
        return this;
    };
    /**
     * @returns {scriptL#150}
     */
    this.update = function( ){
        
        switch ( _GAME.logica.estado() ) {
            case BuscaMinas.Estado.Perdido:
                notificar( 'KABUUUUM!!!',notificar.Tipo.Error);
                //_GAME.this.tablero().classList.add('status-' + BuscaMinas.Estado.Perdido );
                return this.cambiarEstado( BuscaMinas.Estado.Perdido ).revelar();
            case BuscaMinas.Estado.Ganado:
                notificar( 'Has encontrado todas las minas!',notificar.Tipo.Confirmacion);
                //_GAME.this.tablero().classList.add('status-' + BuscaMinas.Estado.Ganado );

                return this.cambiarEstado( BuscaMinas.Estado.Ganado ).revelar();
                break;
            default:
                //notificar('Te quedan ' + _GAME.logica.minas() + ' minas');
                break;
        }

        return this;
    };
    /**
     * @returns {scriptL#143}
     */
    this.crearJuego = function( nivel ){

        _GAME.logica = new BuscaMinas( nivel || BuscaMinas.Nivel.Novato );

        var C = _GAME.this.tablero();
        C.className = 'container grid-' + _GAME.logica.nivel();
        C.innerHTML = '';
        var celdas = _GAME.logica.celdas();

        for (var c = 0; c < celdas.length; c++) {

            var celda = document.createElement('span');
            celda.className = 'celda';
            if( _GAME.logica.explorar( c ) ){
                //celda.className += ' cuidao';
            }
            celda.setAttribute('data-id', c);
            celda.id = 'id-' + c;
            celda.addEventListener('click', function (e) {
                
                e.preventDefault();
                
                if( _GAME.logica.estado() === BuscaMinas.Estado.Jugando ){
                    console.log(e.button);
                    switch( e.button ){
                        case 0:
                            var id = parseInt(this.getAttribute('data-id'));
                            _GAME.this.activar( id ).update( );
                            return true;
                        case 1:
                            console.log('Etiquetar minas');
                            return false;
                    }
                    

                }
                else{
                    console.log( _GAME.logica.estado() );
                }
                
                return false;
            });

            var grid = document.createElement('li');
            grid.className = 'grid';
            grid.appendChild( celda );
            C.appendChild(grid);
        }
        
        return this.update().cambiarEstado( BuscaMinas.Estado.Jugando );
    };
    /**
     * @returns {Element}
     */
    this.tablero = () => document.getElementById('chuscaminas');
    /**
     * @param {Number} estado 
     * @returns {scriptL#152}
     */
    this.cambiarEstado = function( estado ){
        
        var tab = this.tablero();
        
        tab.classList.remove( 'status-1','status-2','status-3' );

        tab.classList.add('status-' + estado);
        
        return this;
    };
    /**
     * @returns {indexL#14}
     */
    this.init = function () {

        document.addEventListener( 'DOMContentLoaded' , e => {
            
//            document.oncontextmenu = (e) => {
//                e.preventDefault();
//                return false;
//            };
            
            var nivel = document.getElementById('nivel');
            Object.keys( BuscaMinas.Nivel).forEach( function( item ){
                var opt = document.createElement('option');
                opt.value = BuscaMinas.Nivel[item];
                opt.innerHTML = item;
                nivel.appendChild( opt );
            });
            
            var boton = document.getElementById('iniciar');
            boton.addEventListener( 'click' , function(e){
                
                e.preventDefault();
                
                var nivel = parseInt( document.getElementById('nivel').value );
                console.log( 'Iniciando nivel ' + nivel );
                _GAME.this.crearJuego( nivel );
                
                return true;
            });

            return true;
        });
    };

    return this.init();
})();
            