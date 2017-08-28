/**
 * Created by ZERG on 28.08.2017.
 */
var WashForm = function() {

    this.init = function() {
        var scope = this;
        $('#btn-order').click(function() {
            scope.send();
        });
    }

    this.open = function() {
        $(".form").hide();
        $(".wash-form").show();
    }
    
    this.send = function() {
        var order = this.getOrder();
        app.message.show('Заказ', 'Ваш заказ принят. Ожидайте приезда нашего сотрудника.');
        
    }
    
    this.getOrder = function() {
        var order = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            model: $('#model').val(),
            number: $('#number').val(),
            place: $('#place').val(),
            service: $('#service').val(),
        };

        return order;
    }

    this.init();
}
