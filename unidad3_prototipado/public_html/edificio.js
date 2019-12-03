/** 
 * @param {String} calle
 * @param {String} numero
 * @param {String} cod_postal
 * @returns {Edificio}
 */
function Edificio( calle, numero, cod_postal ){
    
    this.calle = calle || '';
    this.numero = numero || '';
    this.cp = cod_postal || '';
    this.plantas = [];
    
    this.puertas = [];
    

    return this;
}
/**
 * 
 * @returns {String}
 */
Edificio.prototype.imprimeCalle = function(){ return this.calle; };
/**
 * 
 * @returns {String}
 */
Edificio.prototype.imprimeNumero = function(){ return this.numero; };
/**
 * 
 * @returns {String}
 */
Edificio.prototype.imprimeCodigoPostal = function(){ return this.cp; };
/**
 * @param {String} calle
 * @returns {Edificio.prototype}
 */
Edificio.prototype.modificarCodigoPostal = function( cod_post ){ this.cp = cod_post.toString() ; return this; };
/**
 * @param {String} calle
 * @returns {Edificio.prototype}
 */
Edificio.prototype.modificarCalle = function( calle ){ this.calle = calle.toString() ; return this; };
/**
 * @param {Number} numero
 * @returns {Edificio.prototype}
 */
Edificio.prototype.modificarNumero = function( numero ){ this.numero = numero.toString(); return this; };
/**
 * @param {Number} plantas
 * @param {Number} puertas
 * @returns {Edificio.prototype}
 */
Edificio.prototype.agregarPlantasYPuertas = function( plantas , puertas ){
    
    for( var p = 0 ; p < plantas ; p++ ){
        
        var casas = [];

        for( var c = 0 ; c < puertas ; c++ ){
        
            casas.push('');
        }
        
        this.plantas.push( casas );
    }
    
    return this;
};
/**
 * @param {String} nombre
 * @param {Number} planta
 * @param {Number} puerta
 * @returns {Edificio.prototype}
 */
Edificio.prototype.agregarPropietario = function(nombre,planta,puerta,callback){
    
    if( this.plantas.length && this.plantas.length >= planta && planta > 0){
        if( this.plantas[planta-1].length && this.plantas[planta-1].length >= puerta && puerta > 0){
            this.plantas[planta-1][puerta-1] = nombre;
            if( typeof callback === 'function'){
                callback(nombre,planta,puerta);
            }
        }
    }
    return this;
};
/**
 * 
 * @returns {String}
 */
Edificio.prototype.imprimePlantas = function( ){
    
    var output  = [
        'Listado de propietarios del edificio calle ' + this.calle+' n&uacute;mero ' + this.numero
    ];
    
    for( var p = 0 ; p < this.plantas.length ; p++ ){
                
        for( var c = 0 ; c < this.plantas[p].length ; c++ ){
        
            output.push('Propietario del piso '
                    + (c+1) + ' de la planta '
                    + (p+1) + ': '
                    + (this.plantas[p][c].length ? this.plantas[p][c] : 'vac&iacute;o')
                    + '.');
        }
    }
    
    return output.join("\n");
};

