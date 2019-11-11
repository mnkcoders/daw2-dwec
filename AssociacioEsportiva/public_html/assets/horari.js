/**
 * 
 * @returns {FormHorari}
 */
function FormHorari(){
    
    
    this.bind = function(){
        
        console.log('Form Horario inicializado');
        
        return this;
    };
    
    /**
     * 
     * @returns {CalculadoraFCM}
     */
    this.reset = function(){
        
        return this;
    };
    
    return this.bind();
}