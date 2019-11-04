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
            
                switch( _clicked ){
                    case 'imc':
                        new CalculadoraIMC();
                        break;
                    case 'fcm':
                        new CalculadoraFCM();
                        break;
                    case 'horari':
                        new FormHorari();
                        break;
                    case 'categoria':
                        new CalculadoraCategoria();
                        break;
                    default:
                        //funció invalida
                        break;
                }
            
            });
            
            return true;
        });
        
    });
});