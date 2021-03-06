/**
 * Created by ZERG on 28.08.2017.
 */
var App = function() {

    this.apiUrl = 'http://bulag.tk/admin/api';

    this.apiGoogle = 'AIzaSyDwmDR0f3MXKPcU2WMPhFujNyiDXSDLs-c';
    
    this.lang = null;
    
    this.menu_opening = false;

    this.registerForm = null;
    
    this.washForm = null;
    
    this.mapForm = null;

    this.user = null;
    
    this.init = function() {

        var scope = this;

        this.lang = new Lang();

        this.lang.init(function() {
            
            scope.user = new User();

            scope.washer = new Washer();

            scope.washForm = new WashForm();

            scope.settingsForm = new SettingsForm();

            scope.registerForm = new RegisterForm();

            scope.rateForm = new RateForm();

            scope.orderForm = new OrderForm();
            
            scope.registerWasherForm = new RegisterWasherForm();
            
            scope.loginForm = new LoginForm();
            
            scope.orderDetailForm = new OrderDetailForm();

            scope.clientOrderDetailForm = new ClientOrderDetailForm();
            
            scope.datePicker = new DateTimePicker();

            scope.clientOrders = new ClientOrders();

            scope.clientRateForm = new ClientRateForm();

            scope.termUse = new TermUse();

            $('.checkbox').click(function() {
                $(this).toggleClass('checked');
            });

            $('.language-wrapper').find('li').
                removeClass('selected').
                click(function() {
                    scope.lang.prefix = $(this).attr('id');
                    localStorage.setItem('lang', scope.lang.prefix);
                    document.location.reload();
            });

            $('#' + localStorage.getItem('lang')).addClass('selected');

            $('.main-background').height($(window).height());

            //$('.menu-wrapper').height($(window).height());
            
            $('#btn-wash').click(function() {
                scope.washForm.open();
            });

            $('#btn-register').click(function() {
                scope.registerWasherForm.open();
            });

            $('.mask').click(function() {
                scope.message.hide();
                $('.services-wrapper').hide();
                $('.type-wrapper').hide();
                $('.address-wrapper').hide();
                $('.addresses-wrapper').hide();
                app.hideMask();
            });

            var user = scope.getUser();

            if(user == null) {
                $('.menu-wrapper ul').html($('#menu-wrapper-user ul').html());
                window.setTimeout(function() { $('.menu-wrapper .menu-item-login').show(); },500);
            }

            if(user != null && user.type == 0) {
                $('.menu-wrapper ul').html($('#menu-wrapper-user ul').html());
                window.setTimeout(function() { $('.menu-wrapper .menu-item-logout').show(); },500);
            }

            if(user != null && user.type == 1) {
                $('.menu-wrapper ul').html($('#menu-wrapper-washer').html());
                window.setTimeout(function() { $('.menu-wrapper .menu-item-logout').show(); },500);
            }

            scope.googlePlacesLoad();
            scope.open();
        });

    }

    this.back = null;
    
    this.backBtn = function() {
        if(this.back != null) this.back();
    }

    this.logout = function() {
        localStorage.removeItem("currentLogin");
        document.location.reload();
    }
    
    this.initAutocomplete = function() {
        var scope = this;
        this.orderPlace = new google.maps.places.Autocomplete(document.getElementById('map-autocomplete'), {types: ['geocode']});
        this.washerPlace = new google.maps.places.Autocomplete(document.getElementById('regw_address'), {types: ['geocode']});
        this.settingsPlace = new google.maps.places.Autocomplete(document.getElementById('add_new_address'), {types: ['geocode']});
        this.orderPlace.addListener('place_changed', function() {
            app.washForm.address = $('#map-autocomplete').val();
            var place = scope.orderPlace.getPlace();
            app.washForm.latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        });
        this.washerPlace.addListener('place_changed', function() {
            app.washForm.address = $('#map-autocomplete').val();
            var place = scope.washerPlace.getPlace();
            app.registerWasherForm.latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        });
        this.settingsPlace.addListener('place_changed', function() {
            var place = scope.settingsPlace.getPlace();
            if(typeof(app.settingsForm.address) == "undefined") app.settingsForm.address = [];
            app.settingsForm.address.push({
                address: $('#add_new_address').val(),
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        });
    }

    this.getUser = function() {
        var user = null;
        if(localStorage.getItem("currentLogin") == null) return null;
        if(localStorage.getItem("currentLogin") == 0) {
            user = app.user.getUserData();
            user.type = 0;
        } else if(localStorage.getItem("currentLogin") == 1) {
            user = app.user.getUserData();
            user.type = 1;
        }
        return user;
    }

    this.openMenu = function() {
        var height = 330;
        var user = this.getUser();
        if(user != null && user.type == 1) {
            height = 240;
            $('#menu-item-register-washer').hide();
        }

        if(user != null && user.type == 0) {
            height = 270;
            $('#menu-item-register-client').hide();
        }

        $( ".menu-wrapper" ).animate({ height: "+=" + height + "px" }, 200, function() {
            $(this).show();
        });
        this.menu_opening = true;
    }

    this.closeMenu = function() {
        var height = 330;
        var user = this.getUser();
        if(user != null && user.type == 1) height = 270;
        $( ".menu-wrapper" ).animate({ height: "-=" + height + "px" }, 200, function() {
            $(this).hide();
        });
        this.menu_opening = false;
    }

    this.googlePlacesLoad = function() {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=" + app.apiGoogle + "&libraries=places&callback=app.initAutocomplete");
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".content").show();
    }
    
    this.showMask = function() {
        $('body').css({overflow: 'hidden'});
        $('.mask').height($(document).height()).show();
    }
    
    this.hideMask = function() {
        $('body').css({overflow: 'scroll'})
        $('.mask').hide();
    }
    
    this.message = {
        
        show: function(title, body, copyText) {
            $(document).scrollTop(0);
            $('#message-copy-btn').hide();
            var top = $(document).scrollTop();
            var el =  $('.message-wrapper');
            $('.message-wrapper .message-title').html(title);
            $('.message-wrapper .message-body').html(body);

           $(el).css({
                top: top + ($(window).height() / 2) - ($(el).height() / 2)
            }).show();
            if(copyText && copyText != "") {
                $('#message-copy-btn').show();
            }
            app.showMask();
        },

        hide: function() {
            app.hideMask();
            $('.message-wrapper').hide();
        },

        copy: function() {
            var tmp   = document.createElement('INPUT');
            tmp.value = $('#sms-text').text();
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            this.hide();
        }
        
    }
    
    this.log = function(msg) {
        if(localStorage.getItem('log') == null) localStorage.setItem('log', JSON.stringify([]));
        var log = JSON.parse(localStorage.getItem('log'));
        log.push(msg);
        localStorage.setItem('log', JSON.stringify(log));
    }
    
    this.clearLog = function() {
        localStorage.setItem('log', JSON.stringify([]));
    }
    
    this.showLog = function() {
        var log = JSON.parse(localStorage.getItem('log'));
        var log_text = "";
        $.each(log, function(index, el) {
            log_text += el + "<br>";
        });
        this.message.show("log", '<span style="font-size: 8px;line-height: 10px;">' + log_text + '</span>');
    }

    this.consoleLog = function() {
        document.write(localStorage.getItem('log'));
    }

    this.getCarTypeName = function(type) {
        var type_name = $('#settings_type_wrapper').find('li[value="' + type + '"]').html();
        return type_name;
    }

    this.getServiceName = function(service) {
        var service_name = $('#services_type_wrapper').find('li[value="' + service + '"]').html();
        return service_name;
    }

    this.getOrderStatusName = function(status) {
        var status = $('#order_status_names').find('li[value="' + status + '"]').html();
        return status;
    }
    
}

var app = new App();
