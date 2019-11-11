/**
 * 
 * @returns {CalculadoraFCM}
 */
function CalculadoraFCM(){
    /**
     * @type CalculadoraFCM
     */
    var _self = this;
    /**
     * 
     * @param {Number} fcm
     * @returns {String}
     */
    this.clasificacion = function( fcm ){
        
        console.log( fcm );
        
        //var pct = fcm / 100;

        switch( true ){
            case ( fcm >= 60 && fcm < 70 ):
                return 'Zona de recuperación (60%-70%)';
            case ( fcm >= 70 && fcm < 80 ):
                return 'Zona aer&oacute;bica (70%-80%)';
            case ( fcm >= 80 && fcm < 90 ):
                return 'Zona anaer&oacute;bica (80%-90%)';
            case ( fcm >= 90 && fcm < 100 ):
                return 'L&iacute;nea Roja (90%-100%)';
        }
        
        return 'valores incorrectos';
    };
    /**
     * 
     * @param {type} edad
     * @param {type} sexo
     * @returns {Number}
     */
    this.calcular = function( edad , sexo ){
        
        switch( sexo ){
            case CalculadoraFCM.Sexo.HOMBRE:
                return ( ( 209 - parseInt(edad) ) * 0.7 ).toFixed(2);
            case CalculadoraFCM.Sexo.MUJER:
                return ( ( 214 - parseInt(edad) ) * 0.8 ).toFixed(2);
        }
        
        return 0.0;
    };
    /**
     * @param {Number} fcm
     * @returns {CalculadoraFCM}
     */
    this.display = function( fcm ){
        
        var output = document.getElementById('fcm_output');
        
        if( output !== null ){
            
            output.innerHTML = '<h3>FCM: <span>'
                    + fcm + '</span></h3>'
                    + '<p>' + this.clasificacion( fcm ) + '</p>';
            
        }
        
        return this;
    };
    
    /**
     * @returns {CalculadoraFCM}
     */
    this.bind = function(){
        
        var edad = document.getElementById('fcm_edad');
        var sexo = document.getElementById('fcm_sexo');
        
        document.getElementById('fcm_button').addEventListener( 'click' , function(e){
            
            e.preventDefault();
            
            _self.display(_self.calcular(edad.value,sexo.value));
            
            return true;
        });
        
        console.log('Form FCM inicializado');
        
        return this;
    };
    
    return this.bind();
}
/**
 * @type CalculadoraFCM.Sexo
 */
CalculadoraFCM.Sexo = {
    HOMBRE: 'h',
    MUJER: 'm',
};


