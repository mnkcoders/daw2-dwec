

/**
 * 
 * @returns {CalculadoraIMC}
 */
function CalculadoraIMC(){
    
    var _inputs = {
        'height': null,
        'weight': null,
        'button': null,
        'output': null,
    };
    
    var _settings = {
        
    };
    
    /**
     * 
     * @returns {CalculadoraIMC}
     */
    this.bind = function(){
        
        _inputs.height = document.getElementById('imc_height');
        
        _inputs.width = document.getElementById('imc_width');

        _inputs.button = document.getElementById('imc_button');
        
        _inputs.output = document.getElementById('imc_output');
        
        _inputs.button.addEventListener( 'click' , function(e){
            
            e.preventDefault();
            
            console.log('clicked!!');
            
            return true;
        });

        console.log('Form IMC inicializado');

        return this;
    };
    
    
    return this.bind();
}