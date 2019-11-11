

/**
 * 
 * @returns {CalculadoraIMC}
 */
function CalculadoraIMC(){
    /**
     * @type CalculadoraIMC
     */
    var _self = this;
    
    var _inputs = {
        'height': null,
        'weight': null,
        'button': null,
        'output': null,
    };
    
    var _settings = {

    };
    /**
     * @param {Number} imc
     * @returns {Number}
     */
    this.clasificacion = function( imc ){
        
        switch( true ){
            case ( imc < 16 ): //<16.00: Infrapeso (delgadez severa)
                return CalculadoraIMC.Clasificacion.DELGADEZ_SEVERA;
            case (imc >= 16 && imc < 17): //16.00 – 16.99: Infrapeso (delgadez moderada)
                return CalculadoraIMC.Clasificacion.DELGADEZ_MODERADA;
            case (imc >= 17 && imc < 18.50 ): //17.00 - 18.49: Infrapeso (delgadez aceptable)
                return CalculadoraIMC.Clasificacion.DELGADEZ_ACEPTABLE;
            case (imc >= 18.50 && imc < 25 ): //18.50 - 24.99: Peso normal
                return CalculadoraIMC.Clasificacion.NORMAL;
            case (imc >= 25 && imc < 30 ): //25.00 - 29.99: Sobrepeso
                return CalculadoraIMC.Clasificacion.SOBREPESO;
            case ( imc >= 30 && imc < 35 ): //30.00 - 34.99: Obeso (Tipo I)
                return CalculadoraIMC.Clasificacion.OBESO_TIPO_1;
            case ( imc >= 35 && imc <= 40 ): //35.00 - 40.00: Obeso (Tipo II)
                return CalculadoraIMC.Clasificacion.OBESO_TIPO_2;
            case ( imc > 40 ): //>40.00: Obeso (Tipo III)
                return CalculadoraIMC.Clasificacion.OBESO_TIPO_3;
        }
    };
    /**
     * @param {Number} imc
     * @returns {String}
     */
    this.mostrarClasificacion = function( imc ){
        //console.log(this.clasificacion( imc ));
        switch( this.clasificacion( imc ) ){
            case CalculadoraIMC.Clasificacion.DELGADEZ_SEVERA:
                return 'Infrapeso (delgadez severa)';
            case CalculadoraIMC.Clasificacion.DELGADEZ_MODERADA:
                return 'Infrapeso (delgadez moderada)';
            case CalculadoraIMC.Clasificacion.DELGADEZ_ACEPTABLE:
                return 'Infrapeso (delgadez aceptable)';
            case CalculadoraIMC.Clasificacion.NORMAL:
                return 'Peso normal';
            case CalculadoraIMC.Clasificacion.SOBREPESO:
                return 'Sobrepeso';
            case CalculadoraIMC.Clasificacion.OBESO_TIPO_1:
                return 'Obeso (Tipo I)';
            case CalculadoraIMC.Clasificacion.OBESO_TIPO_2:
                return 'Obeso (Tipo II)';
            case CalculadoraIMC.Clasificacion.OBESO_TIPO_3:
                return 'Obeso (Tipo III)';
        }
        return 'clasificacion invalida';
    };
    /**
     * @param {Number} altura
     * @param {Number} peso
     * @returns {Number}
     */
    this.calcular = function( peso , altura ){
       
       var a = parseFloat( altura );

       var p = parseFloat( peso );
       
       return a > 0 ? ( p / a ).toFixed(2) : 0.0;
    };
    /**
     * 
     * @param {Number} imc
     * @returns {CalculadoraIMC}
     */
    this.display = function( imc ){
        
        console.log(output);

        var output = document.getElementById('imc_output');
        
        output.innerHTML = '<h3>IMC: <span>'
                + imc + '</span></h3>'
                + '<p>' + this.mostrarClasificacion( imc ) + '</p>';
        
        return this;
    };
    /**
     * 
     * @returns {CalculadoraIMC}
     */
    this.bind = function(){
        
        var height = document.getElementById('imc_height');
        
        var weight = document.getElementById('imc_weight');

        //_inputs.output = document.getElementById('imc_output');
        
        document.getElementById('imc_button').addEventListener( 'click' , function(e){
            
            e.preventDefault();
            
            //console.log('clicked!!');
            _self.display(_self.calcular(
                    weight.value,
                    height.value));
            
            return true;
        });

        console.log('Form IMC inicializado');

        return this;
    };
    
    return this.bind();
}

/**
<16.00: Infrapeso (delgadez severa)
■ 16.00 – 16.99: Infrapeso (delgadez moderada)
■ 17.00 - 18.49: Infrapeso (delgadez aceptable)
■ 18.50 - 24.99: Peso normal
■ 25.00 - 29.99: Sobrepeso
■ 30.00 - 34.99: Obeso (Tipo I)
■ 35.00 - 40.00: Obeso (Tipo II)
■ >40.00: Obeso (Tipo III)
 * @type type
 */
CalculadoraIMC.Clasificacion = {
    DELGADEZ_SEVERA: 1,
    DELGADEZ_MODERADA: 2,
    DELGADEZ_ACEPTABLE: 3,
    NORMAL: 4,
    SOBREPESO: 5,
    OBESO_TIPO_1: 6,
    OBESO_TIPO_2: 7,
    OBESO_TIPO_3: 8
};




