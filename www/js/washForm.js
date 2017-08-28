/**
 * Created by ZERG on 28.08.2017.
 */
var WashForm = function() {

    this.init = function() {

        var scope = this;
        $('#btn-order').click(function() {
            scope.send();
        });

        $('#phone').mask('99-99-99');

        $('.type-wrapper').find('li').click(function() {
            var val = $(this).attr('value');
            $('#type-value').html($(this).html());
            $('#model').val(val);
            $('.type-wrapper').hide();
            app.hideMask();
        });

        $('.services-wrapper').find('li').click(function() {
            $(this).find('i').toggleClass('selected');
        });

        $('.type-input').click(function() {
            app.showMask();
            $('.type-wrapper').show();
        });

        $('.services-input').click(function() {
            app.showMask();
            $('.services-wrapper').show();
        });

        $('.photo-input').click(function() {
            scope.onPhoto();
        });
    }

    this.open = function() {
        $(".form").hide();
        $(".wash-form").show();
    }
    
    this.send = function() {
        var order = this.getOrder();
        app.message.show('Заказ', 'Ваш заказ принят. Ожидайте приезда нашего сотрудника.');
        
    }
    
    this.onSelectedTypes = function() {
        app.hideMask();
        $('.services-wrapper').hide();
    }

    this.getOrder = function() {
        var order = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            model: $('#model').val(),
            number: $('#number').val(),
            place: $('#place').val(),
            service: $('#service').val(),
            photo: $('#photo').val(),
            date_time: $('#date_time').val(),
        };

        return order;
    }

    this.onPhoto = function() {
        navigator.camera.getPicture( function(picture) {
            debugger;
        }, function() {

        });
    }

    this.init();
}
