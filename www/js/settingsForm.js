/**
 * Created by ZERG on 16.09.2017.
 */
var SettingsForm = function() {

    this.data = {}

    this.car_type = "";

    this.init = function() {
        var scope = this;
        var settings = localStorage.getItem("settings");
        if( settings != null) {
            try {
                this.data = JSON.parse(settings);
            } catch (ex) {
                localStorage.removeItem("settings");
            }
        }
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".settings-form").show();
    }

    this.save = function() {
        var data = {
            name: $('#setting_name').val(),
            phone: $('#setting_phone').val(),
            car_type: this.car_type,
            number: $('#setting_number').val()
        }

        localStorage.setItem('settings', JSON.stringify(data));
    }

    this.init();
}