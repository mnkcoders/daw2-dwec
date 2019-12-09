/**
 * @param {String} title 
 * @returns {Modal}
 */
function Modal( title , display_id ){
    
    var _setup = {
        'id': display_id || 'respuesta',
        'title': title || 'New Modal',
        'window': null,
        'overrideOutput': false,
        'options': []
    };
    /**
     * @returns {Modal}
     */
    this.toggleOverride = () => {
       
       _setup.overrideOutput = !_setup.overrideOutput;
        
        console.log( 'Sobrescribir contenedor de salida ' + ( _setup.overrideOutput ? 'activado' : 'desactivado' ) );
        
        return this;
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
        
        _setup.window.document.body.innerHTML = '';
               
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
    
    /**
     * @returns {Window}
     */
    this.alert = ( message ) => _setup.window !== null ? _setup.window.alert( message ) : '';
    /**
     * @param {String} message
     * @param {String} def 
     * @returns {String}
     */
    this.prompt = ( message , def ) => _setup.window !== null ? _setup.window.prompt(
            message,
            typeof def !== 'undefined' ? def : '' ) : '';
    /**
     * @returns {Boolean}
     */
    this.close = () => _setup.window !== null ? _setup.window.close() : false;
    /** 
     * @param {String} mensaje
     * @param {String} titulo
     * @returns {Modal}
     */
    this.mostrar = ( mensaje , titulo ) => {
        
        //var display = this.parent().document.body;
        var display = document.getElementById(_setup.id);
        //console.log(display);
        
        if( display !== null ){
            
            if( _setup.overrideOutput ){
                display.innerHTML = '<h3>'
                + ( titulo || 'Resultado' ) + '</h3>'
                + '<p>' + mensaje  + '</p>';
            }
            else{
                display.innerHTML += '<h3>'
                + ( titulo || 'Resultado' ) + '</h3>'
                + '<p>' + mensaje  + '</p>';
            }

        }
        
        return this;
    };
    /**
     * @returns {Window}
     */
    this.parent = () => _setup.window.top;
    
    return this;
}
/**
 * @returns {Modal}
 */
Modal.create = function( title , id ){ return new Modal( title , id ); };
/**
 * @type Modal
 */
