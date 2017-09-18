/**
 * Created by ZERG on 18.09.2017.
 */
var OrderForm = function() {

    this.init = function() {
        var scope = this;
    }

    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".order-form").show();
    }


    this.init();
}