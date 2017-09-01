/**
 * Created by ZERG on 28.08.2017.
 */
var WashForm = function() {

    this.photo = "";
    
    this.services = "";
    
    this.latlng = "";

    this.address = "";

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

        $('#del-photo-btn').click(function(e) {
            scope.photo = "";
            e.stopPropagation();
            e.preventDefault();
            $('.auto-photo-wrapper').hide();
            $(this).hide();
        });

        $('.map-input').click(function() {
            app.mapForm.open();
        });


        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            scope.latlng = {
                lat: lat,
                lng: lng
            };
            scope.setAddress(scope.latlng);
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

    this.setAddress = function(LatLng) {
        var scope = this;
        try {
            var latLng = new plugin.google.maps.LatLng(LatLng.lat, LatLng.lng);
            plugin.google.maps.Geocoder.geocode({ 'position': latLng }, function (results) {
                // app.log("Lat: " + LatLng.lat);
                // app.log("Lng: " + LatLng.lng);
                // app.log("Result: " + JSON.stringify(results));
                if (results && results.length > 0) {
                    if (results[0].locality && results[0].thoroughfare) {
                        scope.address = results[0].locality + ", " + results[0].thoroughfare;
                        $('#map-value').html(scope.address);
                        $('#map-autocomplete').val(scope.address);
                    }
                }
            });
        } catch (e) {
            app.message.show('Error', e.message);
        }

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
            address: scope.address,
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
            $('.auto-photo-wrapper').show();
            $('.auto-photo-wrapper').css({
                'background-image': 'url(' + url + ')'
            });
            $("#del-photo-btn").show();
        }, function() {
            scope.photo = "";
            $("#del-photo-btn").hide();
            $('.auto-photo-wrapper').hide();
        },{ quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    this.init();
}
