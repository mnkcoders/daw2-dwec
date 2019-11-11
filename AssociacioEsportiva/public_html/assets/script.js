var UTILIDAD = {
    fcm: null,
    imc: null,
    categoria: null,
    horario: null,
    iniciar: function( app ){
        
        switch ( app ) {
            case 'imc':
                if( this.imc === null ){
                    this.imc = new CalculadoraIMC();
                }
                else{
                    this.imc.reset();
                }
                break;
            case 'fcm':
                if( this.fcm === null ){
                    this.fcm = new CalculadoraFCM();
                }
                else{
                    this.fcm.reset();
                }
                break;
            case 'horari':
                if( this.horario === null ){
                    this.horario = new FormHorari();
                }
                else{
                    this.horario.reset();
                }
                break;
            case 'categoria':
                if( this.categoria === null ){
                    this.categoria = new Categoria();
                }
                else{
                    this.categoria.reset();
                }
                break;
            default:
                //funció invalida
                console.log('Utilidad inválida');
                break;
        }
        
    }
};

/**
 * 
 * @param {String|HTML} input
 * @returns {Boolean}
 */
window.addEventListener( 'load' , function(){

    //console.log(document.getElementsByClassName( 'utility' ));
    
    Array.prototype.map.call(document.getElementsByClassName( 'utility' ), function(button){
        
        button.addEventListener( 'click' , function(e){
      
            e.preventDefault();
            
            var _clicked = this.id;
            
            //console.log( 'Clicking ' + _clicked );

            Array.prototype.map.call( document.getElementsByClassName( 'utility-form' ) , function( form ){
            
                //console.log(form.getAttribute('data-bind'));
                
                if(form.getAttribute('data-bind') === _clicked ){
                    
                    form.classList.add( 'active' );
                }
                else{
                    form.classList.remove( 'active'); 
                }
            
                UTILIDAD.iniciar( _clicked );
            });
            
            return true;
        });
        
    });
});