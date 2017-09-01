/**
 * Created by ZERG on 29.08.2017.
 */
var RegisterForm = function() {

    this.init = function() {
        var scope = this;
        $('#btn-sign').click(function() {
            scope.signIn();
        });

        if(app.user.userData != null) {
            $('#btn-sign').html('Вход');
        }
    }

    this.open = function() {
        document.removeEventListener("backbutton");
        document.addEventListener("backbutton", function() {
            app.open();
        }, false);
        $(".form").hide();
        $(".register-form").show();
    }

    this.signIn = function() {
        var scope = this;
        var data = this.getFormData();
        $.ajax({
            url: app.apiUrl + '/register',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(response) {
                if(response.res == 0) {
                    app.user.setUserData(response.user);
                    app.open();
                } else if(response.res == 1) {
                    app.message.show('Ошибка', 'Сервис временно не доступен. Попробуйте позже');
                } else if(response.res == 2) {
                    app.message.show('Ошибка', 'E-mail или пароль указаны неверно');
                }
            },
            error: function() {
                app.message.show('Ошибка', 'Сервис временно не доступен. Попробуйте позже');
            }
        });
    }

    this.getFormData = function() {
        return {
            email: $('#email').val(),
            pass: $('#pass').val(),
            is_worker: $('#is_worker').is(':checked')
        }
    }

    this.init();

}