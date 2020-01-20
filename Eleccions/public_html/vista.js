
(function Pantalla() {

    var _componentes = {
        'instance': this,
        'vistas': [
            'view_resultados', 
            'view_modificar', 
            'view_entrada'
            ],
        'botones': [
            'btn_resultados',
            'btn_modificar',
            'btn_entrada', 
            'btn_importar_resutlados', 
            'btn_actualizar_recuento',
            'btn_demo'],
        /**
         * @type Elecciones
         */
        'datos': new Elecciones()
    };
    /**
     * @param {String} option
     * @returns {Pantalla}
     */
    this.toggle = function (option) {
        for (var i = 0; i < _componentes.vistas.length; i++) {
            var view = document.getElementById(_componentes.vistas[i]);
            view.classList.remove('active');
            if (_componentes.vistas[i ] === option) {
                view.classList.add('active');
            }
        }
        return this;
    };
    /**
     * @returns {Pantalla}
     */
    this.importarEntrada = function () {

        var inputs = document.querySelectorAll('input.votos');

        if (inputs !== null) {
            inputs.forEach(function (item) {
                var id = item.id.split('.');
                var votos = item.value;
                _componentes.datos.actualizar(id[0], id[1], parseInt(votos));
            });
        }

        return this;
    };
    /**
     * 
     * @param {String} vista
     * @returns {Pantalla}
     */
    this.refrescarEntrada = function ( ) {

        var tabla = document.querySelector('#view_entrada table');

        tabla.innerHTML = '';

        var cabecera = document.createElement('tr');
        cabecera.appendChild(document.createElement('th'));
        Object.keys(Elecciones.Partidos).forEach(function (partido) {
            var p = document.createElement('th');
            p.innerHTML = Elecciones.Partidos[partido];
            cabecera.appendChild(p);
        });
        tabla.appendChild(cabecera);

        for (var c in Elecciones.Colegios) {
            var linea = document.createElement('tr');
            var colegio = document.createElement('td');
            colegio.innerHTML = Elecciones.Colegios[ c ];
            linea.appendChild(colegio);
            for (var p in Elecciones.Partidos) {

                var celda = document.createElement('td');
                var input = document.createElement('input');
                input.type = 'number';
                input.placeholder = 0;
                input.min = 0;
                input.className = 'votos';
                input.id = c + '.' + p;
                input.value = _componentes.datos.resultado(c, p);
                celda.appendChild(input);
                linea.appendChild(celda);
            }
            tabla.appendChild(linea);
        }

        return this;
    };
    /**
     * 
     * @param {String} vista
     * @returns {Pantalla}
     */
    this.refrescarResultados = function ( ) {

        var tabla = document.querySelector('#view_resultados table');

        tabla.innerHTML = '';
        //cabecera
        var cabecera = document.createElement('tr');
        cabecera.appendChild(document.createElement('th'));
        Object.keys(Elecciones.Partidos).forEach(function (partido) {
            var p = document.createElement('th');
            p.innerHTML = Elecciones.Partidos[partido];
            cabecera.appendChild(p);
        });
        var cabecera_total = document.createElement('th');
        cabecera_total.innerHTML = 'Total';
        cabecera.appendChild(cabecera_total);

        //resultado partidos footer
        var recuento_partidos = document.createElement('tr');
        var total_votos = document.createElement('td');
        var footer_total = document.createElement('td');
        footer_total.className = 'yellow lighten-5';
        footer_total.innerHTML = '<strong>Total</strong>';
        total_votos.innerHTML = _componentes.datos.totalVotos();
        total_votos.className = 'orange lighten-5';

        recuento_partidos.appendChild(footer_total);
        Object.keys(Elecciones.Partidos).forEach(function (partido) {
            var r = document.createElement('td');
            r.className = 'yellow lighten-5';
            r.innerHTML = '<strong>' + _componentes.datos.totalPartido(partido) + '</strong>';
            recuento_partidos.appendChild(r);
        });
        recuento_partidos.appendChild(total_votos);

        //componer tabla
        tabla.appendChild(cabecera);
        for (var c in Elecciones.Colegios) {

            var linea = document.createElement('tr');
            var colegio = document.createElement('td');
            var total_centro = document.createElement('td');

            colegio.innerHTML = Elecciones.Colegios[ c ];
            total_centro.innerHTML = _componentes.datos.totalColegio(c);
            total_centro.className = 'red lighten-5';

            linea.appendChild(colegio);
            for (var p in Elecciones.Partidos) {

                var votos = document.createElement('td');
                votos.innerHTML = _componentes.datos.resultado(c, p);
                linea.appendChild(votos);
            }

            linea.appendChild(total_centro);
            tabla.appendChild(linea);
        }
        tabla.appendChild(recuento_partidos);

        return this;
    };
    /**
     * 
     * @returns {Pantalla}
     */
    this.refrescarListaPartidos = function(){
        
        var lista = document.querySelector('#view_resultados .partidos');

        lista.innerHTML = '';
        
        _componentes.datos.resultadoPorPartido( ).sort( function( a , b ){
            //ordenar de mayor a menor voto
            return a.votos > b.votos ? -1 : b.votos > a.votos ? 1 : 0;
        }).forEach( function( p ){

            lista.innerHTML += '<li class="pad-sm">'
                    + p.partido
                    + '<strong class="right">'
                    + p.votos
                    + '</strong></li>';
            
        });
        
        return this;
    };
    /**
     * 
     * @returns {Pantalla}
     */
    this.refrescarListaCentros = function(){
        
        var lista = document.querySelector('#view_resultados .centros');

        lista.innerHTML = '';

        _componentes.datos.resultadoPorColegio( ).sort( function( a , b ){
            //ordenar de mayor a menor voto
            return a.votos > b.votos ? -1 : b.votos > a.votos ? 1 : 0;
        }).forEach( function( c ){
            
            lista.innerHTML += '<li class="pad-sm">'
                    + c.centro
                    + '<strong class="right">'
                    + c.votos
                    + '</strong></li>';
            
        });
         
        return this;
    };
    /**
     * @returns {Pantalla}
     */
    this.refrescarModificar = function () {
        document.getElementById('votos').value = 0;
        return this;
    };
    /**
     * @returns {Pantalla}
     */
    this.listarPartidos = function () {
        var lista_partidos = document.getElementById('partido');
        Object.keys(Elecciones.Partidos).forEach(function (partido) {
            var p = document.createElement('option');
            p.value = partido;
            p.innerHTML = Elecciones.Partidos[ partido ];
            lista_partidos.appendChild(p);
        });
        return this;
    };
    /**
     * @returns {Pantalla}
     */
    this.listarColegios = function () {

        var lista_colegios = document.getElementById('colegio');

        Object.keys(Elecciones.Colegios).forEach(function (colegio) {
            var c = document.createElement('option');
            c.value = colegio;
            c.innerHTML = Elecciones.Colegios[ colegio ];
            lista_colegios.appendChild(c);
        });
        return this;
    };
    /**
     * @returns {Pantalla}
     */
    this.iniciar = function () {

        document.addEventListener('DOMContentLoaded', e => {

            for (var i = 0; i < _componentes.botones.length; i++) {

                document.getElementById(_componentes.botones[ i ]).addEventListener('click', e => {

                    e.preventDefault();

                    switch (e.toElement.id) {
                        case 'btn_resultados':
                            _componentes.instance.toggle('view_resultados')
                                    .refrescarResultados('view_resultados')
                                    .refrescarListaCentros()
                                    .refrescarListaPartidos();
                            break;
                        case 'btn_modificar':
                            _componentes.instance.toggle('view_modificar').refrescarModificar('view_modificar');
                            break;
                        case 'btn_entrada':
                            _componentes.instance.toggle('view_entrada').refrescarEntrada('view_entrada');
                            break;
                        case 'btn_demo':
                            _componentes.datos.demo();
                            _componentes.instance
                                    .refrescarEntrada()
                                    .refrescarResultados()
                                    .refrescarListaPartidos()
                                    .refrescarListaCentros();
                            break;
                        case 'btn_actualizar_recuento':
                            _componentes.datos.actualizar(
                                    document.getElementById('colegio').value,
                                    document.getElementById('partido').value,
                                    parseInt(document.getElementById('votos').value)
                                    );
                            break;
                        case 'btn_importar_resutlados':
                            _componentes.instance.importarEntrada();
                            break;
                    }

                    return true;
                });
            }
        });

        return this.listarColegios().listarPartidos().refrescarEntrada();
    };

    return this.iniciar();
}( /* AUTOCARGAR CONTROL y eventos DE VISTAS*/ ));
            