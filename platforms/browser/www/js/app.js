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

            scope.washForm = new WashForm();

            scope.registerForm = new RegisterForm();
            
            scope.registerWasherForm = new RegisterWasherForm();

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
                app.hideMask();
            });
            scope.googlePlacesLoad();
            scope.open();
        });

    }

    this.initAutocomplete = function() {
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('map-autocomplete'), {types: ['geocode']});
        autocomplete.addListener('place_changed', function() {
            app.washForm.address = $('#map-autocomplete').val();
            var place = autocomplete.getPlace();
            app.washForm.latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        });
    }

    this.openMenu = function() {
        $( ".menu-wrapper" ).animate({
            height: "+=290px",
            opacity: "+=1"
        }, 200);
        this.menu_opening = true;
    }

    this.closeMenu = function() {
        $( ".menu-wrapper" ).animate({
            height: "-=290px",
            opacity: "-=1"
        }, 200);
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
        
        show: function(title, body) {
            var top = $(document).scrollTop();
            var el =  $('.message-wrapper');
            $('.message-wrapper .message-title').html(title);
            $('.message-wrapper .message-body').html(body);

           $(el).css({
                top: top + ($(window).height() / 2) - ($(el).height() / 2)
            }).show();
            app.showMask();
        },

        hide: function() {
            app.hideMask();
            $('.message-wrapper').hide();
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

}

var app = new App();
