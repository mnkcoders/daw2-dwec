/**
 * @param {String} title 
 * @returns {Modal}
 */
function Modal( title ){
    
    var _setup = {
        'title': title || 'New Modal',
        'window': null,
        'options': []
    };
    /**
     * 
     * @returns {Modal}
     */
    this.show = function(){
        
        _setup.window = window.open( '' , "modal", "width=600, height=400, scrollbars=no");
        //console.log(_setup.window);
        if( _setup.window === null ){
            console.log('Activate PopUps!!');
            return this;
        }
        
        _setup.window.document.head.innerHTML = _setup.window.parent.document;
        
        _setup.window.document.title = _setup.title;
               
        _setup.options.forEach( function( option ){
            
            if( typeof option.callback === 'function' ){
                
                var button = document.createElement('button');

                button.innerHTML = option.title;

                button.addEventListener('click', option.callback );
                
                var line_option = document.createElement('p');
                
                line_option.appendChild(button);

                _setup.window.document.body.appendChild( line_option );
            } 
        });
        
        return this;
    };
    /**
     * 
     * @param {String} option
     * @param {Function} callback
     * @returns {Modal}
     */
    this.bind = function( option , callback ){
        
        _setup.options.push({
            'title': option,
            'callback': callback
        });
        
        return this;
    };
    
    
    return this;
}
/**
 * @returns {Modal}
 */
Modal.create = function( title ){ return new Modal( title ); };