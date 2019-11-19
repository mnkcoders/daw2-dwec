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
     * 
     * @returns {unresolved}
     */
    this.crearCalendario = function(){

        document.addEventListener('DOMContentLoaded',function(e){
            
            var date = new Date();

            document.querySelector('#calendario .day').innerHTML = date.getUTCDate();
            document.querySelector('#calendario .month').innerHTML = _self.getMonth( date.getUTCMonth() );
            document.querySelector('#calendario .year').innerHTML = date.getUTCFullYear();

        });
    };
    
    return this.crearCalendario();
})();



