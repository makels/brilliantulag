/**
 * Created by ZERG on 19.09.2017.
 */
var OrderDetailForm = function() {

    this.id = 0;

    this.order = null;

    this.init = function() {
        var scope = this;
    }

    this.open = function(id) {
        if(id) this.id = id;
        app.closeMenu();
        this.refreshOrder();
        $(".form").hide();
        $(".order-detail-form").show();

        app.back = function() {
            app.open();
        }
    }

    this.refreshOrder = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/get_order",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrder(response.order);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.setOrder = function(order) {
        if(order) this.order = order;
        var tmpl = $('#order-detail-wrapper-tpl').html();
        var services = order.service.split(";");
        var services_names = "";
        var distance = order.distance > 0 ? order.distance + " " + app.lang.get("км") + " " : "";
        if(order.distance == 0 && (order.lat > 0 || order.lng > 0)) distance = app.lang.get("Рядом с вами");
        $.each(services, function(index, service) {
            if(service != "") services_names += app.getServiceName(service);
        });
        var cnt = tmpl.replace(new RegExp("{date_time}", 'g'), order.date_time).
                replace(new RegExp("{name}", 'g'), order.name).
                replace(new RegExp("{phone}", 'g'), order.phone).
                replace(new RegExp("{photo}", 'g'), order.photo).
                replace(new RegExp("{address}", 'g'), order.address).
                replace(new RegExp("{distance}", 'g'), distance).
                replace(new RegExp("{number}", 'g'), order.number).
                replace(new RegExp("{type}", 'g'), app.getCarTypeName(order.model)).
                replace(new RegExp("{id}", 'g'), order.id).
                replace(new RegExp("{services}", 'g'), services_names);
        $('.order-detail-wrapper').html(cnt);
        window.setTimeout(function() {
           switch(Number(order.status)) {
               case 0:
                   $('.order-detail-wrapper .btn-accept-order').show();
                   break;
               case 1:
                   $('.order-detail-wrapper .btn-unset-order').show();
                   $('.order-detail-wrapper .btn-start-order').show();
                   break;
               case 2:
                   $('.order-detail-wrapper .btn-end-order').show();
                   break;
           }
            
           if(order.photo != "") {
               $('.order-detail-wrapper .order-detail-photo').show();
           } 
        }, 100);
    }

    this.accept = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/accept_order",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrder(response.order);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.unset = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/unset_order",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrder(response.order);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.start = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/start_order",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrder(response.order);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.end = function() {
        var scope = this;
        $.ajax({
            url: app.apiUrl + "/end_order",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                washer: app.washer.getWasherData()
            },
            success: function(response) {
                if(response.res == 0) {
                    scope.setOrder(response.order);
                } else {
                    app.hideMask();
                    app.message.show(app.lang.get('Ошибка'), app.lang.get('Сервис временно не доступен. Попробуйте позже'));
                    app.open();
                }
            }
        });
    }

    this.init();
}