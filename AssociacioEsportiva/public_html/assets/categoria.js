/**
 * 
 * @returns {Categoria}
 */
function Categoria(){
    
    /**
     * 
     * @returns {Categoria}
     */
    this.reset = function(){
        
        return this;
    };
    
    /**
     * @returns {Categoria}
     */
    this.bind = function(){
        
        document.getElementById( 'cat_button').addEventListener( 'click' , function(e){

            e.preventDefault();
            
            var edad = document.getElementById('cat_edad').value;
            
            console.log( edad );
            
            return true;
        });
        
        console.log('Form Categoria inicializado');
        
        return this;
    };
    
    return this.bind();
}