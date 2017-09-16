/**
 * Created by ZERG on 16.09.2017.
 */
var LoginForm = function() {

    this.init = function() {
        var scope = this;
        if(app.user.userData != null && typeof(app.user.userData.email) != "undefined")
            $('#login_email').val(app.user.userData.email);
        if(app.washer.userData != null && typeof(app.washer.userData.email) != "undefined")
            $('#login_email').val(app.washer.userData.email);
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".login-form").show();
    }
    
    this.login = function() {
        var scope = this;
        var email = $('#login_email').val();
        var pass = $('#login_pass').val();
        var type = $('#login_type').hasClass('checked') ? 1 : 0;

        $.ajax({
            url: app.apiUrl + "/login",
            type: 'post',
            dataType: 'json',
            data: {
                email: email,
                pass: pass,
                type: type
            },
            success: function(response) {
                if(response.res == 0) {
                    if(type == 0) {
                        localStorage.setItem("currentLogin", 0);
                        response.user.pass =
                        app.user.setUserData(response.user);
                        app.open();
                    } else {
                        localStorage.setItem("currentLogin", 1);
                        app.washer.setWasherData(response.washer);
                        app.open();
                    }
                } else {
                    app.message.show(app.lang.get("Ошибка"), app.lang.get("Неверный email или пароль"));
                }
            }
        });
    }
    
    this.init();
}