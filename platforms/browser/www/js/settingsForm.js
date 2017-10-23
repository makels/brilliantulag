/**
 * Created by ZERG on 16.09.2017.
 */
var SettingsForm = function() {

    this.data = {};

    this.address = [];

    this.car_type = "";

    this.init = function() {
        var scope = this;
        this.fill();

        $('#settings_type_wrapper').find('li').click(function() {
            var val = $(this).attr('value');
            $('#setting-type-value').html($(this).html());
            $('#setting_model').val(val);
            $('#settings_type_wrapper').hide();
            app.hideMask();
        });

        $('#settings_sel_type').click(function() {
            app.showMask();
            $(document).scrollTop(0);
            $('.type-wrapper').show();
        });
        
        $('#address_sel_type').click(function() {
            app.showMask();
            $(document).scrollTop(0);
            $('.address-wrapper').show();
        });

        $('#btn_add_new_address').click(function() {
            scope.addNewAddress();
            app.hideMask();
            $('.address-wrapper').hide();
        });

        $('#btn_cancel_new_address').click(function() {
            app.hideMask();
            $('.address-wrapper').hide();
        });

        this.updateAddressList();
    }

    this.open = function() {
        app.closeMenu();
        this.fill();
        $(".form").hide();
        $(".settings-form").show();

        app.back = function() {
            app.open();
        }
    }

    this.save = function() {
        var data = {
            name: $('#setting_name').val(),
            address: this.address,
            email: $('#setting_email').html(),
            phone: $('#setting_phone').val(),
            car_type: this.car_type,
            number: $('#setting_number').val()
        }

        localStorage.setItem('settings', JSON.stringify(data));
        document.location.reload();
    }

    this.addNewAddress = function() {
        this.data = {
            name: $('#setting_name').val(),
            address: this.address,
            email: $('#setting_email').html(),
            phone: $('#setting_phone').val(),
            car_type: this.car_type,
            number: $('#setting_number').val()
        }
        localStorage.setItem('settings', JSON.stringify(this.data));
        $('#add_new_address').val('');
        this.updateAddressList();
    }
    
    this.updateAddressList = function() {
        var addressContent = "";
        if(typeof(this.data.address) != 'undefined' && this.data.address.length > 0) {
            $.each(this.data.address, function(index, item) {
                addressContent += '<div class="field"><label>' + app.lang.get("Адрес:") + '</label><br><div class="type-input">' + item.address + '<i onclick="app.settingsForm.deleteAddress(\'' + item.address + '\');" style="color: #0c9cee !important;" class="fa fa-minus-circle"></i></div></div>';
            });
        }
        $('.settings-address-list').html(addressContent);
    }

    this.deleteAddress = function(address) {
        var a = [];
        $.each(this.address, function(index, item) {
            if(item.address != address) a.push(item);
        });
        this.address = a;
        this.data.address = this.address;
        var data = {
            name: $('#setting_name').val(),
            address: this.address,
            email: $('#setting_email').html(),
            phone: $('#setting_phone').val(),
            car_type: this.car_type,
            number: $('#setting_number').val()
        }
        localStorage.setItem('settings', JSON.stringify(data));
        this.updateAddressList();
    }

    this.fill = function() {
        var settings = localStorage.getItem("settings");

        // First init
        if(settings == null) {
            var data = app.user.getUserData();
            if(data == null) data = app.washer.getWasherData();
            if(data != null) {
                settings = data;
                settings.car_type = 0;
            }
        } else {
            settings = JSON.parse(settings);
            if(settings.car_type == "") settings.car_type = 0;
        }

        if( settings != null) {
            try {
                this.data = settings;
                if(typeof(settings.address) != "undefined") {
                    this.address = settings.address;
                }
                var type_name = $('#settings_type_wrapper').find('li[value="' + this.data.car_type + '"]').html();
                // Settings form
                $('#setting_name').val(this.data.name);
                $('#setting_phone').val(this.data.phone);
                $('#setting_email').html(this.data.email);
                $('#setting_number').val(this.data.number);
                $('#setting-type-value').html(type_name);
                $('#setting_model').val(this.data.car_type);

                // Order form
                $('#name').val(this.data.name);
                $('#phone').val(this.data.phone);
                $('#type-value').val(type_name);
                $('#model').val(this.data.car_type);
                $('#number').val(this.data.number);


            } catch (ex) {
                localStorage.removeItem("settings");
            }
        }

        this.refresh();
    }
    
    this.refresh = function() {
        var user = app.getUser();
        if(user == null) return;
        $.ajax({
            url: app.apiUrl + "/refresh_rest",
            type: 'post',
            dataType: 'json',
            data: {
                email: user.email,
                pass: user.pass
            }, success: function(response) {
                if(response.res == 0) {
                    $('#setting_rest').html(response.rest);
                    $('#setting_ball').html(response.ball);
                }
            }
        });
    }

    this.init();
}