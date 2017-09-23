/**
 * Created by ZERG on 23.09.2017.
 */
var ClientOrders = function() {
    
    this.init = function() {
        var scope = this;
    }

    this.open = function() {
        app.closeMenu();
        this.refreshOrders();
        $(".form").hide();
        $(".client-orders-form").show();

        app.back = function() {
            app.open();
        }
    }
    
    this.refreshOrders = function() {
        var scope = this;
        var user = app.getUser();
        var local_order = localStorage.getItem("current_order");
        if(user == null && local_order != null) {
            // From local
            var orders = [];
            orders.push(JSON.parse(local_order));
            this.setOrders(orders);
        } else if(user != null) {
            // From Api
            $.ajax({
                url: app.apiUrl + "/get_client_orders",
                type: 'post',
                dataType: 'json',
                data: {
                    client_id: user.id
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
    }

    this.setOrders = function(orders) {
        var self = "";
        var cnt = "";
        var tmpl = $('#client-order-wrapper-tpl').html();
        $.each(orders, function(index, order) {
            var m = moment(order.date_time);
            var time = "";
            if(m.isValid()) time = moment(order.date_time).format("DD.MM HH:mm");
            cnt +=
                tmpl.replace(new RegExp("{date_time}", 'g'), time).
                replace(new RegExp("{name}", 'g'), order.name).
                replace(new RegExp("{phone}", 'g'), order.phone).
                replace(new RegExp("{status}", 'g'), app.getOrderStatusName(order.status)).
                replace(new RegExp("{address}", 'g'), order.address).
                replace(new RegExp("{self}", 'g'), "").
                replace(new RegExp("{id}", 'g'), order.id);
        });
        $('.client-orders-wrapper').html(cnt);
    }
    
    this.init();
}