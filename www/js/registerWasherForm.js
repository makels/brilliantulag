/**
 * Created by ZERG on 16.09.2017.
 */
var RegisterWasherForm = function() {

    this.init = function() {
        var scope = this;
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".register-washer-form").show();
    }

    this.registration = function() {
        var scope = this;
        var data = this.getFormData();
        if(data === false) return;
        $.ajax({
            url: app.apiUrl + '/register_washer',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(response) {
                if(response.res == 1) {
                    app.message.show(app.lang.get('Регистрация'), app.lang.get('Такой пользователь уже существует'));
                    return;
                }
                response.user.type = 1;
                response.user.pass = data.pass;
                app.user.setUserData(response.user);
                app.message.show(app.lang.get('Регистрация'), app.lang.get('Вы успешно зарегистрировались'));
                app.open();
            },
            error: function() {
                app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
            }
        });
    }

    this.getFormData = function() {
        var data = {
            name: $('#regw_name').val(),
            phone: $('#regw_phone').val(),
            email: $('#regw_email').val(),
            pass: $('#regw_pass').val(),
            address: $('#regw_address').val(),
            transport: $('#regw_transport').hasClass("selected")
        }
        if(data.name == "" || data.phone == "" || data.email == "" || data.pass == "" || data.address) {
            app.message.show(app.lang.get("Ошибка"), app.lang.get("Заполните все поля"));
            return false;
        }
        return data;
    }

    this.init();

}