/**
 * Crea un programa que generi dos taules html amb els horaris de la associació.
Hi haurà una taula d’horari de matí que mostri les hores de 2 en 2 amb el format 9:00-11:00, des de
les 9 fins les 15 i els dies de dilluns a divendres.
Hi haurà una altre taula d’horari de tarda que mostri les hores de 1 en 1 amb el format 16:00-17:00 i
els dies de dilluns a diumenge.
 * @returns {Horario}
 */
function Horario(){
    
    /**
     * BD de horarios
     * @type Array
     */
    var _planing = {
        'M':{
            'titulo':'Horario Mañanas',
            'horarios':{
                '09:00 - 11:00': Horario.Dias.slice(0,5),
                '11:00 - 13:00': Horario.Dias.slice(0,5),
                '13:00 - 15:00': Horario.Dias.slice(0,5)
            }
        },
        'T':{
            'titulo':'Horario Tardes',
            'horarios':{
                '16:00': Horario.Dias,
                '17:00': Horario.Dias,
                '18:00': Horario.Dias,
                '19:00': Horario.Dias
            }
        }
    };
    /**
     * @returns {Horario}
     */
    this.display = function(){
        
        var d = Horario.Dias.map( function(dia){ return '<th>' + dia + '</th>'; });

        var m = Object.keys(_planing.M.horarios ).map( function( item ){
            return '<tr><td>' + item + '</td>'
                    + _planing.M.horarios[item].map( function(){ return '<td></td>'; }).join('') + '</tr>';
        });
        
        var t = Object.keys(_planing.T.horarios ).map( function( item ){
            return '<tr><td>' + item + '</td>'
                    + _planing.T.horarios[item].map( function(){ return '<td></td>'; }).join('') + '</tr>';
        });
        
        //console.log(m);
        
        document.getElementById('hor_output').innerHTML = '<table><tr><th class="header" colspan="6">'
                + _planing.M.titulo + '</th></tr><tr><th><!--vacio--></th>'
                + d.slice(0,5).join('') + '</tr>'
                + m.join('') +'</table><hr class="separator"/><table><tr><th class="header" colspan="8">'
                + _planing.T.titulo + '</th></tr><tr><th><!--vacio--></th>'
                + d.join('') + '</tr>'
                + t.join('') + '</table>';
        
        
        return this;
        
    };
    
    
    this.bind = function(){
        
        //console.log('Form Horario inicializado');
        
        return this.display();
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
/**
 * @type Array
 */
Horario.Dias = ['Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado','Domingo'];