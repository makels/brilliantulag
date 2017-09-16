/**
 * Created by ZERG on 28.08.2017.
 */
var App = function() {

    this.apiUrl = 'http://bulag.tk/admin/api';
    
    this.lang = null;

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

            $('.language-wrapper').find('li').
                removeClass('selected').
                click(function() {
                    scope.lang.prefix = $(this).attr('id');
                    localStorage.setItem('lang', scope.lang.prefix);
                    document.location.reload();
            });

            $('#' + localStorage.getItem('lang')).addClass('selected');

            $('.main-background').height($(window).height());

            $('#btn-wash').click(function() {
                scope.washForm.open();
            });

            $('#btn-register').click(function() {
                scope.registerForm.open();
            });

            $('.mask').click(function() {
                scope.message.hide();
                $('.services-wrapper').hide();
                $('.type-wrapper').hide();
                app.hideMask();
            });

            scope.open();
        });

    }

    this.open = function() {
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
