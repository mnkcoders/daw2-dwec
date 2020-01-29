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
     * @returns {Object}
     */
    this.tablero = () => _BM.tablero;
    /**
     * @param {Number} id
     * @returns {Number|Boolean}
     */
    this.getUp = function (id) {

        return id > _BM.tablero.cols - 1 ? id - _BM.tablero.cols : false;
    };
    /**
     * @param {Number} id
     * @returns {Number|Boolean}
     */
    this.getDown = function (id) {

        return parseInt(id / _BM.tablero.cols) < (_BM.tablero.rows - 1) ?
                id + _BM.tablero.cols :
                false;
    };
    /**
     * @param {Number} id
     * @returns {Boolean|_BM.celdas}
     */
    this.getLeft = function (id) {

        return id % _BM.tablero.cols > 0 ? id - 1 : false;
    };
    /**
     * @param {Number} id
     * @returns {Boolean|_BM.celdas}
     */
    this.getRight = function (id) {

        return id % _BM.tablero.cols < _BM.tablero.cols - 1 ? id + 1 : false;
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
     * @returns {Number}
     */
    this.revelar = function (x, y) {

        return this.explorar((y * _BM.tablero.cols) + x);
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

        var N = _BM.tablero.cols * _BM.tablero.rows;
        var M = _BM.tablero.cols;
        _BM.tablero.minas = 0;

        for (var i = 0; i < N; i++) {

            var mina = M > 0 && parseInt(Math.random() * 5) > 3;

            _BM.celdas.push(mina);

            if (mina) {
                M--;
                _BM.tablero.minas++;
            }
        }
        
        _BM.status = BuscaMinas.Estado.Jugando;
        
        console.log('Minas ' + this.minas()) ;
        console.log('Celdas ' + _BM.celdas.length ) ;
        console.log('Nivel ' + _BM.tablero.cols ) ;
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
    this.descubrir = function (id, mine) {

        document.getElementById('id-' + id).classList.add('show');

        if (typeof mine === 'boolean' && mine) {
            document.getElementById('id-' + id).classList.add('mine');
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

        if (_GAME.logica.activar(id)) {

            //console.log(' KABUM!!');
            return this.descubrir(id, true).update( BuscaMinas.Estado.Perdido );
        }
        else {
            //no hay mina!
            this.descubrir(id);
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
        }

        return this.update();
    };
    /**
     * @returns {scriptL#150}
     */
    this.update = function( ){
        
        switch ( _GAME.logica.estado() ) {
            case BuscaMinas.Estado.Perdido:
                notificar( 'KABUUUUM!!!',notificar.Tipo.Error);
                //_GAME.this.tablero().classList.add('status-' + BuscaMinas.Estado.Perdido );
                return this.cambiarEstado( BuscaMinas.Estado.Perdido );
            case BuscaMinas.Estado.Ganado:
                notificar( 'Has encontrado todas las minas!',notificar.Tipo.Confirmacion);
                //_GAME.this.tablero().classList.add('status-' + BuscaMinas.Estado.Ganado );
                document.querySelectorAll('.celda').forEach( item =>{
                    var id = item.getAttribute('data-id');
                    if( _GAME.logica.explorar( parseInt(id))){
                        item.classList.add('show','mine');
                    }
                    else{
                        item.classList.add('show');
                    }
                });
                return this.cambiarEstado( BuscaMinas.Estado.Ganado );
                break;
            default:
                notificar('Te quedan ' + _GAME.logica.minas() + ' minas');
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
        C.className = 'container grid-' + _GAME.logica.tablero().cols;
        C.innerHTML = '';
        var celdas = _GAME.logica.celdas();

        for (var c = 0; c < celdas.length; c++) {

            var celda = document.createElement('span');
            celda.className = 'celda';
            if( _GAME.logica.explorar( c ) ){
                celda.className += ' cuidao';
            }
            celda.setAttribute('data-id', c);
            celda.id = 'id-' + c;
            celda.addEventListener('click', function (e) {
                
                e.preventDefault();
                
                if( _GAME.logica.estado() === BuscaMinas.Estado.Jugando ){
                    
                    var id = parseInt(this.getAttribute('data-id'));
                    
                    _GAME.this.activar( id ).update( );

                    return true;
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
            