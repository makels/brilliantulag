/**
 * Created by ZERG on 28.08.2017.
 */
var App = function() {

    this.washForm = null;
    
    this.init = function() {

        this.washForm = new WashForm();

        var scope = this;
        $('.main-background').height($(window).height());
        $('.mask').height($(window).height());
        $('#btn-wash').click(function() {
            scope.washForm.open();
        });
        this.open();
    }

    this.open = function() {
        $(".form").hide();
        $(".content").show();
    }
    
    this.showMask = function() {
        $('.mask').show();
    }
    
    this.hideMask = function() {
        $('.mask').hide();
    }
    
    this.message = {
        
        show: function(title, body) {
            $('.message-wrapper .message-title').html(title);
            $('.message-wrapper .message-body').html(body);
            $('.mask').show();
            $('.message-wrapper').show();
        },

        hide: function() {
            $('.mask').hide();
            $('.message-wrapper').hide();
        }
        
    }

}

var app = new App();
