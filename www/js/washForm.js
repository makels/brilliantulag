/**
 * Created by ZERG on 28.08.2017.
 */
var WashForm = function() {

    this.photo = "";
    
    this.services = "";
    
    this.latlng = "";

    this.address = "";
    
    this.datetime = moment();

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
            scope.refreshPrice();
        });

        $('.services-wrapper').find('li').click(function() {
            $('.services-wrapper').find('li i').removeClass('selected');
            $(this).find('i').toggleClass('selected');
            scope.refreshPrice();
        });

        $('#wash_sel_type').click(function() {
            app.showMask();
            $(document).scrollTop(0);
            $('.type-wrapper').show();
        });

        $('#wash_sel_date').click(function() {
            app.datePicker.select(function(date) {
                $('#date_time_val').html(date.str);
                scope.datetime = date.val;
            });
        });

        $('.services-input').click(function() {
            app.showMask();
            $(document).scrollTop(0);
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

        this.refreshPrice();

        // $('.map-input').click(function() {
        //     app.mapForm.open();
        // });


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
        var current = moment().format("DD.MM.YYYY HH:mm");
        app.closeMenu();
        $(".form").hide();
        $('#date_time_val').html(current);
        $(".wash-form").show();

        app.back = function() {
            app.open();
        }
    }
    
    this.send = function() {
        var scope = this;
        var order = this.getOrder();
        if(this.checkOrder(order) === false) return;
        app.showMask();
        $.ajax({
            url: app.apiUrl + "/new_order",
            type: 'post',
            dataType: 'json',
            data: order,
            success: function(response) {
                app.hideMask();
                if(response.res == 0) {
                    app.message.show(app.lang.get('Заказ'), app.lang.get('Ваш заказ принят. Ожидайте приезда нашего сотрудника.'));
                    localStorage.setItem("current_order", JSON.stringify(response.order));
                    app.open();
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            },
            error: function() {
                app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                app.open();
            }
        });

    }

    this.setAddress = function(LatLng) {
        var scope = this;
        try {
            var latLng = new plugin.google.maps.LatLng(LatLng.lat, LatLng.lng);
            plugin.google.maps.Geocoder.geocode({ 'position': latLng }, function (results) {
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

    this.openAddresses = function() {
        if(typeof(app.settingsForm.data.address) != "undefined" && app.settingsForm.data.address.length > 0) {
            var addresses = app.settingsForm.data.address;
            var cnt = "";
            $.each(addresses, function(index, item) {
                cnt += '<li onclick="app.washForm.onSelectedAddress('+ index +');">' + item.address + '</li>';
            });
            $('.addresses-wrapper ul').html(cnt);
            app.showMask();
            $('.addresses-wrapper').show();
        }
    }

    this.onSelectedAddress = function(index) {
        app.hideMask();
        $('.addresses-wrapper').hide();
        var address = app.settingsForm.data.address[index];
        $('#map-autocomplete').val(address.address);
        this.latlng = {
            lat: address.lat,
            lng: address.lng
        };
    }
    
    this.onSelectedTypes = function() {
        var scope = this;
        app.hideMask();
        this.services = "";
        var i = 0;
        $.each($('.services-wrapper .selected'), function(index, el) {
            i++;
            scope.services = $(el).parent().attr("value");
        });
        $('.services-wrapper').hide();
        $('#services-value').html(app.lang.get(app.getServiceName(scope.services)));

    }

    this.checkOrder = function(order) {
        var err = false;
        if(order.name == "") err = true;
        if(order.phone == "") err = true;
        if(order.model == "") err = true;
        if(order.number == "") err = true;
        //if(order.place == "") err = true;
        if(order.service.length == 0) err = true;
        if(order.date_time == "") err = true;
        if(err) app.message.show(app.lang.get("Ошибка"), app.lang.get("Заполните все поля"));
        return !err;
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
            address: $('#map-autocomplete').val(),
            service: Number($('.services-wrapper .selected').parent().attr("value")),
            //date_time: $('#date_time').val(),
            date_time: this.datetime.format("YYYY-MM-DD HH:mm"), // TODO: Date and time order
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

    this.refreshPrice = function() {
        var order = this.getOrder();
        $.ajax({
            url: app.apiUrl + "/price",
            type: 'post',
            dataType: 'json',
            data: {
                service: order.service,
                type: order.model
            },
            success: function(response) {
                if(response.res == 0) {
                    $('#order_price').html(response.price + " TMT");
                }
            }
        });
    }

    this.init();
}
