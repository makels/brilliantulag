/**
 * Created by ZERG on 28.08.2017.
 */
var WashForm = function() {

    this.photo = "";
    
    this.services = "";
    
    this.latlng = "";

    this.init = function() {

        var scope = this;
        $('#btn-order').click(function() {
            scope.send();
        });

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

        $('.auto-photo-wrapper').click(function() {
            scope.onPhoto();
        });

        $("#del-photo-btn").click(function() {
            scope.photo = "";
            $('.auto-photo-wrapper').css({
                'background-image': 'url(../img/nophoto.png)'
            });
            $(this).hide();
        });
        
        $('.map-input').click(function() {
            app.mapForm.open();
        });
    }

    this.open = function() {
        $(".form").hide();
        $(".wash-form").show();
    }
    
    this.send = function() {
        var scope = this;
        var order = this.getOrder();
        $.ajax({
            url: app.apiUrl + "/new_order",
            type: 'post',
            dataType: 'json',
            data: order,
            success: function(response) {
                if(response.res == 0) {
                    app.message.show('Заказ', 'Ваш заказ принят. Ожидайте приезда нашего сотрудника.');
                } else {
                    app.message.show('Ошибка', 'Сервис временно не доступен. Попробуйте позже');
                }
            },
            error: function() {
                app.message.show('Ошибка', 'Сервис временно не доступен. Попробуйте позже');
            }
        });

    }
    
    this.onSelectedTypes = function() {
        var scope = this;
        app.hideMask();
        this.services = "";
        $.each($('.services-wrapper .selected'), function(index, el) {
            scope.services += $(el).attr("value") + ";";
        });
        $('.services-wrapper').hide();
    }

    this.getOrder = function() {
        var scope = this;
        var user_id = 0;
        var user = app.user.getUserData();
        if(user && user.id) user_id = user.id;
        var order = {
            user_id: user_id,
            name: $('#name').val(),
            phone: $('#phone').val(),
            model: $('#model').val(),
            number: $('#number').val(),
            place: scope.latlng,
            service: scope.services,
            date_time: $('#date_time').val(),
            photo: scope.photo
        };

        return order;
    }

    this.onPhoto = function() {
        var scope = this;
        navigator.camera.getPicture( function(pictureData) {
            scope.photo = pictureData;
            var url = "data:image/jpeg;base64," + pictureData;
            $('.auto-photo-wrapper').css({
                'background-image': 'url(' + url + ')'
            });
            $("#del-photo-btn").show();
        }, function() {

        },{ quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    this.init();
}
