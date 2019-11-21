/**
 * Iniciador
 */
( function(){
    
    var _self = this;
    /**
     * @param {Number} month
     * @returns {String}
     */
    this.getMonth = function( month ){
        
        var months = ['Enero','Febrero','Marzo','Abril',
            'Mayo','Junio','Julio','Agosto',
            'Septiembre','Octubre','Noviembre','Diciembre'];
        
        return months[ month % 12 ];
    };
    /**
     * @returns {scriptL#4}
     */
    this.crearCalendario = function(){

        document.addEventListener('DOMContentLoaded',function(e){
            
            var date = new Date();

            document.querySelector('#calendario .day').innerHTML = date.getUTCDate();
            document.querySelector('#calendario .month').innerHTML = _self.getMonth( date.getUTCMonth() );
            document.querySelector('#calendario .year').innerHTML = date.getUTCFullYear();
        });
        
        return this;
    };
    /**
     * @returns {scriptL#4}
     */
    this.iniciarPopups = function(){
        
        document.addEventListener('DOMContentLoaded',function(e){
            
            var popup_links = document.querySelector('a.popup-link');

            console.log(popup_links);

            if( Array.isArray(popup_links)){
                Array.prototype.forEach.call( popup_links, function( link ){
                        //console.log(link);
                        //invocar para todos los elementos clicados con la clase popup-link
                        // que abran sobre otra ventana
                        link.addEventListener('click',function(e){
                            e.preventDefault();
                            console.log('abriendo ' + this.href );
                            _self.popup( this.href );
                            return false;
                        });
                });
            }
            else{
                popup_links.addEventListener('click',function(e){
                            e.preventDefault();
                            console.log('abriendo ' + this.href );
                            _self.popup( this.href );
                            return false;
                        });
            }
        });
        return this;
    };
    /**
     * @returns {scriptL#4}
     */
    this.loginForm = function(){
        

        //var _popup = window.open('', "", "width=600, height=400, scrollbars=no");
        var _popup = _self.popup('');

        _popup.document.body.classList.add('popup');
        _popup.document.head.innerHTML = document.head.innerHTML;
        _popup.document.body.innerHTML = document.getElementById('login').innerHTML;
        
        _popup.document.getElementById('login-btn').addEventListener('click',function(e){

            e.preventDefault();

            var password = _popup.document.getElementById('password').value;


            //console.log(e);
            if( u2e9_contrasena( password ) ){
                //cerrar ventana y volver a la web
                //_popup.close();
                _popup.window.alert('Logeado!!');
                //alert('Logeado!!');
                _popup.window.setTimeout(function(){
                    _popup.window.close();
                },500);
            }
            else{

                _popup.document.getElementById( 'lbl_error' ).innerHTML = 'Tu contraseña no es segura!';
            }

            return false;
        });

        
        return _popup;
    };
    /**
     * 
     * @returns {scriptL#4}
     */
    this.mostrarLogin = function(){
        document.addEventListener('DOMContentLoaded',function(e){
            window.setTimeout(function(){
                //document.getElementById('login').classList.add('active');
                _self.loginForm();
            },2000);
        });
        return this;
    };
    /**
     * @returns {scriptL#4}
     */
    this.popup = function( url ){
        
        var _popup = window.open( url , "", "width=600, height=400, scrollbars=no");
        
        _popup.document.head.innerHTML = document.head.innerHTML;
        
        return _popup;
    };
    
    return this.crearCalendario().mostrarLogin().iniciarPopups();
})();


/**
Que tiene entre 8 y 16 caracteres.
■ Que tiene una letra mayúscula.
■ Que tiene una letra minúscula.
■ Que tiene un número.
■ Que tiene uno de los siguientes caracteres: guión alto, guión bajo, arroba, almohadilla,
dólar, tanto por ciento o &.
■ NOTA: puedes crear una función para cada comprobación.
 * @param {String} pass
 * @returns {undefined}
 */
function u2e9_contrasena( pass ){

    var _uc = false;
    var _lc = false;
    var _num = false;
    var _sp = false;
    var _length = pass.length >= 8 && pass.length <= 16;
    var _specials = ['-','_','@','#','$','%','&'];
    
    /*console.log( 'analizando ' + pass );
    if( _length ){
        console.log('---> está entre 8 y 16 carácteres');
    }*/
    
    for( var c = 0 ; c < pass.length ; c++ ){
        if( !_uc && pass.charAt(c) === pass.charAt(c).toUpperCase() ){
            //console.log('---> contiene mayusculas');
            _uc = true;
        }
        if( !_lc && pass.charAt(c) === pass.charAt(c).toLowerCase() ){
//            console.log('---> contiene minusculas');
            _lc = true;
        }
        //console.log(pass.charAt(c) + ':' + isNaN(pass.charAt(c)));
        if( !_num && !isNaN(pass.charAt(c)) ){
            //console.log('---> contiene numeros');
            _num = true;
        }
        //console.log(pass.charAt(c) + ':' + _specials.includes( pass.charAt(c) ));
        if( !_sp && _specials.includes( pass.charAt(c) ) ){
//            console.log('---> contiene especiales');
            _sp = true;
        }
    }

    return _length && _uc && _lc && _num && _sp;
}

/*
var passwords = [
    'DM@kSCCt9JOzeu',
    'DMrkSCeu',
    'DMrkSC677JOzeu444444444',
    'DMrk',
    'DMr68SCCt9$Ozeu'
];

passwords.forEach(function(item){
    console.log( u2e9_contrasena(item) );
});

*/


