/**
 * Created by ZERG on 28.08.2017.
 */
var App = function() {

    this.apiUrl = 'http://bulag.tk/admin/api';
    
    this.registerForm = null;
    
    this.washForm = null;
    
    this.mapForm = null;
    
    this.user = null;
    
    this.init = function() {

        this.user = new User();
        
        this.washForm = new WashForm();
        
        //this.mapForm = new MapForm();

        this.registerForm = new RegisterForm();
        
        var scope = this;
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

        this.open();
    }

    this.open = function() {
        $(".form").hide();
        $(".content").show();
    }
    
    this.showMask = function() {
        $('body').css({overflow: 'hidden'});
        $('.mask').height($(document).height());
        $('.mask').show();
    }
    
    this.hideMask = function() {
        $('body').css({overflow: 'scroll'})
        $('.mask').hide();
    }
    
    this.message = {
        
        show: function(title, body) {
            var top = $(document).scrollTop();
            $('.message-wrapper .message-title').html(title);
            $('.message-wrapper .message-body').html(body);
            app.showMask();
            $('.message-wrapper').css({
                top: top + ($(window).height() / 2) - ($('.message-wrapper').height() / 2)
            });
            $('.message-wrapper').show();
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
