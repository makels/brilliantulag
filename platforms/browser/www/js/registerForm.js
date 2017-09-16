/**
 * Created by ZERG on 29.08.2017.
 */
var RegisterForm = function() {

    this.init = function() {
        var scope = this;
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".register-form").show();
    }

    this.registration = function() {
        var scope = this;
        var data = this.getFormData();
        if(data === false) return;
        $.ajax({
            url: app.apiUrl + '/register',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(response) {
                if(response.res == 0) {
                    app.user.setUserData(response.user);
                    app.open();
                }
            },
            error: function() {
                app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
            }
        });
    }

    this.getFormData = function() {
        var data = {
            name: $('#reg_name').val(),
            phone: $('#reg_phone').val(),
            email: $('#reg_email').val(),
            pass: $('#reg_pass').val()
        }
        if(data.name = "" || data.phone == "" || data.email == "" || data.pass == "") {
            app.message.show(app.lang.get("Ошибка"), app.lang.get("Заполните все поля"));
            return false;
        }
        return data;
    }

    this.init();

}