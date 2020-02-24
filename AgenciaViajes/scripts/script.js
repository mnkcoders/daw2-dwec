
jQuery(document).ready(e => {
    
    //iicializar desc
    jQuery( '.viatge.panel .desc').slideUp();
    //jQuery( '.viatge.panel .btn-block').slideUp();

    jQuery( '.viatge.panel' ).mouseover( function(e){
    //    jQuery( this ).find('.btn-block').slideToggle();
    });
    jQuery( '.viatge.panel' ).mouseout( function(e){
        //jQuery( this ).find('.btn-block').slideUp();
    });
    
    jQuery( '.filtres a' ).on( 'click', function(e){
        
        e.preventDefault();
                
        jQuery( this ).parent().addClass('active');
        
        switch( true ){
            case jQuery(this).hasClass('mostrar-tot'):
                jQuery( '.mostrar-promo' ).parent().removeClass('active');
                jQuery( '.viatge.panel').removeClass('hide');
                break;
            case jQuery(this).hasClass('mostrar-promo'):
                jQuery( '.mostrar-tot' ).parent().removeClass('active');
                jQuery( '.viatge.panel:not(.en-promocion)').addClass('hide');
                break;
        }
        
        return true;
    });
    
    jQuery('.viatge.panel .btn').on('click', function (e) {

        e.preventDefault();

        var bloc = jQuery(this).parent().parent().parent();
        //hack guarro, estalviam codic
        switch( true ){
            case jQuery( this ).hasClass('reservar'):
                alert( 'Reservado!!!' );
                break;
            //BORRAR
            case jQuery( this ).hasClass('eliminar'):
                var destinacio = jQuery( bloc ).find('.panel-heading').html().toString();
                var opcio = window.confirm('Segur que vols eliminar el viatge a ' + destinacio );
                if( opcio ){
                    jQuery( bloc ).slideUp('fast',function(){
                        jQuery( bloc ).remove( );
                    });
                }
                break;
            //MES INFO
            case jQuery( this ).hasClass( 'mesinfo' ):
                jQuery( bloc ).find( '.desc' ).slideToggle();
                jQuery( this ).toggleClass('open');
                if( jQuery( this ).hasClass('open') ){
                    jQuery( this ).find('.glyphicon')
                            .removeClass('glyphicon-plus')
                            .addClass('glyphicon-minus');
                }
                else{
                    jQuery( this ).find('.glyphicon')
                            .addClass('glyphicon-plus')
                            .removeClass('glyphicon-minus');
                }
                break;
            //PROMOCIO
            case jQuery( this ).hasClass( 'promo' ):
                //jQuery( bloc ).toggleClass( 'en-promocion' );

                if (jQuery(bloc).hasClass('en-promocion')) {
                    jQuery( bloc ).find('.precio-promo').remove();
                    jQuery( bloc ).removeClass('en-promocion');
                    jQuery( this ).removeClass('btn-default').addClass('btn-info').html( 'Posar en promoci&oacute;' );
                } 
                else {

                    var preu = parseInt(jQuery(bloc).attr('data-preu').toString( ));
                    var desc = parseInt(jQuery(bloc).attr('data-dte').toString());
                    var promo = jQuery('<label class="precio-promo green">');
                    var calcul = preu * ((100 - desc) / 100);
                    promo.html('Ahora por ' + calcul + ' €');
                    //agregar promo i taxar preu
                    jQuery(bloc).find('.preu').after(promo);
                    jQuery( bloc ).addClass('en-promocion');

                    jQuery( this ).removeClass('btn-info').addClass('btn-default').html( 'Finalitzar promoci&oacute;' );
                }
                break;
        }



        return true;
    });

});