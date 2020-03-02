/**
 * @param {String} destination 
 * @param {String} price 
 * @param {String} discount 
 * @returns {Booking}
 */
function Booking(destination, price, discount) {

    this.destination = destination;
    this.price = parseInt(price) || 0;
    this.discount = parseInt(discount) || 0;

    this.slots = 1;
    this.name = '';
    this.date = new Date();

    /**
     * @returns {Number}
     */
    this.totalPrice = function () {
        return this.slots * this.salePrice();
    };
    /**
     * @returns {Number}
     */
    this.salePrice = function () {
        return this.price - (this.price * (this.discount / 100));
    };

    this.getDate = function () {

        return [
            this.date.getUTCDate(),
            this.date.getUTCMonth(),
            this.date.getUTCFullYear()
        ].join('-');
    };
    /**
     * @returns {jQuery}
     */
    this.crearItem = function (cls) {

        if (typeof cls === 'undefined') {
            cls = '';
        } else if (Array.isArray(cls)) {
            cls = cls.join(' ');
        }
        var item = jQuery('<li>');
        var dest = jQuery('<h4>');
        dest.html(this.destination);
        var date = jQuery('<p>');
        date.html('Data ' + this.getDate());
        var name = jQuery('<p>');
        name.html('Reserva a nom de ' + this.name);
        var slots = jQuery('<p>');
        slots.html('Nombre de persones: ' + this.slots);
        var price = jQuery('<p>');
        price.html('Preu Total: ' + this.totalPrice() + '€');

        item.append(dest).append(date).append(name).append(slots).append(price);

        console.log(item);

        return item.addClass(cls);
    };

    return this;
}
/**
 * @type Booking
 */
Booking.Form = null;
/**
 * Fer net
 */
Booking.Clear = () => {
    jQuery('#nomReserva').val('');
    jQuery('#numPersones').val('');
    jQuery('#dataReserva').val('');
    Booking.Form = null;
};
/**
 * @param {Array|String} paneles
 */
function actualizarPaneles( paneles ) {
    if(!Array.isArray(paneles)){
        paneles = [ paneles ];
    }
    for( var i = 0 ; i < paneles.length ; i++ ){
        var cls = '.' + paneles[ i ];
        if (jQuery( cls ).children().length > 0) {
            if (jQuery( cls ).hasClass('empty')) {
                jQuery( cls ).removeClass('empty');
            }
        }
        else if (!jQuery( cls ).hasClass('empty')) {
            jQuery( cls ).addClass('empty');
        }
    }
}

jQuery(document).ready(e => {

    jQuery('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: '+0d'
    });
    //drag-drop sin perder la posición inicial
    jQuery(".reservesAcceptades > li,.reserves > li").draggable({
        revert: function (e, ui) {
            $(this).data("uiDraggable").originalPosition = {top: 0, left: 0};
            return !e;
        }
    });
    jQuery(".reservesAcceptades, .reserves").droppable({
        'drop': function (e, ui) {
            var drag = ui.draggable;
            jQuery(this).prepend(drag);
            jQuery(drag).removeAttr('style');

            actualizarPaneles(['reservesAcceptades','reserves']);

            return true;
        }
    });

    jQuery('#papelera').droppable({
        'drop': function (e, ui) {
            //alert( ui.draggable.html() );
            ui.draggable.toggle('explode').remove();
        },
        'over': function (e, ui) {

        },
        'out': function (e, ui) {
        }
    });
    //ordenar
    jQuery('.sortable').sortable().disableSelection();

    //iicializar desc
    jQuery('.viatge.panel .desc').slideUp();
    //jQuery( '.viatge.panel .btn-block').slideUp();

    jQuery('.viatge.panel').mouseover(function (e) {
        //    jQuery( this ).find('.btn-block').slideToggle();
    });
    jQuery('.viatge.panel').mouseout(function (e) {
        //jQuery( this ).find('.btn-block').slideUp();
    });

    jQuery('.filtres a').on('click', function (e) {

        e.preventDefault();

        jQuery(this).parent().addClass('active');

        switch (true) {
            case jQuery(this).hasClass('mostrar-tot'):
                jQuery('.mostrar-promo').parent().removeClass('active');
                jQuery('.viatge.panel').removeClass('hide');
                break;
            case jQuery(this).hasClass('mostrar-promo'):
                jQuery('.mostrar-tot').parent().removeClass('active');
                jQuery('.viatge.panel:not(.en-promocion)').addClass('hide');
                break;
        }

        return true;
    });

    jQuery('.btn.okReservar').on('click', function (e) {
        e.preventDefault();

        var slots = jQuery('#numPersones').val().toString();
        var name = jQuery('#nomReserva').val().toString();
        var date = jQuery('.datepicker').val().toString();
        if (Booking.Form !== null) {
            if (name.length > 0) {
                Booking.Form.slots = slots;
                Booking.Form.name = name;
                Booking.Form.date = new Date(date);

                jQuery('ul.reserves').prepend(Booking.Form.crearItem([
                    'well',
                    'well-sm',
                    'ui-draggable',
                    'ui-draggable-handle',
                    'ui-sortable-handle']));

                Booking.Clear();
            } else {
                window.alert('Escribe el nombre de la reserva');
                return false;
            }
        }
        return true;
    });
    jQuery('.btn.reservar').on('click', function (e) {

        e.preventDefault();

        var bloc = jQuery(this).parent().parent();

        //console.log(jQuery( bloc ).attr("data-preu"));
        Booking.Form = new Booking(
                jQuery(bloc).find('.panel-heading').html().toString(),
                jQuery(bloc).attr('data-preu').toString(),
                jQuery(bloc).attr('data-dte').toString(),
                );

        console.log(Booking.Form);

        return true;
    });

    //jQuery('.viatge.panel .btn').on('click', function (e) {
    jQuery('.btn-block .btn').on('click', function (e) {

        e.preventDefault();

        //var bloc = jQuery(this).parent().parent();
        var bloc = jQuery(this).parent().parent().parent();
        //hack guarro, estalviam codic
        switch (true) {
            case jQuery(this).hasClass('okReservar'):

                break;
                //
            case jQuery(this).hasClass('reservar'):

                break;
                //BORRAR
            case jQuery(this).hasClass('eliminar'):
                var destinacio = jQuery(bloc).find('.panel-heading').html().toString();
                var opcio = window.confirm('Segur que vols eliminar el viatge a ' + destinacio);
                if (opcio) {
                    jQuery(bloc).slideUp('fast', function () {
                        jQuery(bloc).remove( );
                    });
                }
                break;
                //MES INFO
            case jQuery(this).hasClass('mesinfo'):
                jQuery(bloc).find('.desc').slideToggle();
                jQuery(this).toggleClass('open');
                if (jQuery(this).hasClass('open')) {
                    jQuery(this).find('.glyphicon')
                            .removeClass('glyphicon-plus')
                            .addClass('glyphicon-minus');
                } else {
                    jQuery(this).find('.glyphicon')
                            .addClass('glyphicon-plus')
                            .removeClass('glyphicon-minus');
                }
                break;
                //PROMOCIO
            case jQuery(this).hasClass('promo'):
                //jQuery( bloc ).toggleClass( 'en-promocion' );

                if (jQuery(bloc).hasClass('en-promocion')) {
                    jQuery(bloc).find('.precio-promo').remove();
                    jQuery(bloc).removeClass('en-promocion');
                    jQuery(this).removeClass('btn-default').addClass('btn-info').html('Posar en promoci&oacute;');
                } else {

                    var preu = parseInt(jQuery(bloc).attr('data-preu').toString( ));
                    var desc = parseInt(jQuery(bloc).attr('data-dte').toString());
                    var promo = jQuery('<label class="precio-promo green">');
                    var calcul = preu * ((100 - desc) / 100);
                    promo.html('Ahora por ' + calcul + ' €');
                    //agregar promo i taxar preu
                    jQuery(bloc).find('.preu').after(promo);
                    jQuery(bloc).addClass('en-promocion');

                    jQuery(this).removeClass('btn-info').addClass('btn-default').html('Finalitzar promoci&oacute;');
                }
                break;
        }



        return true;
    });

});