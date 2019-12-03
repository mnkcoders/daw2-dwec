

function Modal(){
    
    
    var _setup = {
        'container': null,
        'options': []
    };
    
    this.form = function(){
        
        
        
        _setup.container = document.createElement('div');
        
        
        
        
        return this;
    };
    
    
    /**
     * 
     * @param {String} option
     * @param {Function} callback
     * @returns {Modal}
     */
    this.bindOption = function( option , callback ){
        
        _setup.options.push({
            'title': option,
            'callback': callback
        });
        
        return this;
    };
    
    
    /**
     * 
     * @returns {Modal}
     */
    this.init = function(){
        
        
        
        return this;
    };
}