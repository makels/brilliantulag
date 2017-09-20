/**
 * Created by ZERG on 18.09.2017.
 */
var OrderForm = function() {

    this.init = function() {
        var scope = this;
    }

    this.open = function() {
        app.closeMenu();
        this.refreshOrders();
        $(".form").hide();
        $(".order-form").show();

        app.back = function() {
            app.open();
        }
    }

    this.refreshOrders = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/get_orders",
            type: "post",
            dataType: "json",
            data: {
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrders(response.orders);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.setOrders = function(orders) {
        var self = "";
        var cnt = "";
        var tmpl = $('#order-wrapper-tpl').html();
        var washer = app.washer.getWasherData();
        $.each(orders, function(index, order) {
            var m = moment(order.date_time);
            var time = "";
            if(m.isValid()) time = moment(order.date_time).format("DD.MM HH:mm");
            if(order.washer_id == washer.id) self = "self";
            else self = "";
            var distance = order.distance > 0 ? order.distance + " " + app.lang.get("км") + " " : "";
            if(order.distance == 0 && (order.lat > 0 || order.lng > 0)) distance = app.lang.get("Рядом с вами") + " ";
            cnt +=
                tmpl.replace(new RegExp("{date_time}", 'g'), time).
                replace(new RegExp("{name}", 'g'), order.name).
                replace(new RegExp("{phone}", 'g'), order.phone).
                replace(new RegExp("{address}", 'g'), order.address).
                replace(new RegExp("{distance}", 'g'), distance).
                replace(new RegExp("{self}", 'g'), self).
                replace(new RegExp("{id}", 'g'), order.id);
        });
        $('.orders-wrapper').html(cnt);
    }

    this.init();
}